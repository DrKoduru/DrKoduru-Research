---
name: lab-automation
description: Use when writing lab automation scripts — OpenTrons protocols, liquid handler programming, LIMS integration, 96/384-well plate layouts, barcode/sample tracking, pipetting worklists, or automating any wet lab workflow with Python for qPCR setup, serial dilutions, sample aliquoting, or plate reformatting
---

# Lab Automation — Liquid Handlers, LIMS & Sample Tracking

## OpenTrons Protocol Development (OT-2 / Flex)

### Standard Protocol Structure
```python
from opentrons import protocol_api

metadata = {
    'protocolName': 'qPCR Plate Setup — 96-well',
    'author': 'Dr. Koduru',
    'description': 'Automated qPCR master mix + sample dispensing',
    'apiLevel': '2.16'  # Always specify — behavior changes between versions
}

def run(protocol: protocol_api.ProtocolContext):
    # 1. Load labware
    tip_rack = protocol.load_labware('opentrons_96_tiprack_20ul', '1')
    plate = protocol.load_labware('nest_96_wellplate_100ul_pcr_full_skirt', '2')
    reagent_rack = protocol.load_labware('opentrons_24_tuberack_eppendorf_1.5ml_safelock_snapcap', '3')

    # 2. Load pipettes
    p20 = protocol.load_instrument('p20_single_gen2', 'left', tip_racks=[tip_rack])

    # 3. Define reagents
    master_mix = reagent_rack.wells_by_name()['A1']
    samples = reagent_rack.wells()[:8]  # 8 samples in tube rack

    # 4. Dispense master mix to all wells (15 μL per well)
    p20.pick_up_tip()
    for well in plate.wells()[:96]:
        p20.aspirate(15, master_mix)
        p20.dispense(15, well)
        p20.blow_out(well.top())
    p20.drop_tip()

    # 5. Add samples (5 μL each, triplicate)
    for i, sample in enumerate(samples):
        dest_wells = plate.rows_by_name()['A'][i*3:(i+1)*3]  # triplicates
        p20.transfer(5, sample, dest_wells, new_tip='always',
                     mix_after=(3, 10), blow_out=True)
```

### Common OpenTrons Patterns
| Task | Method | Key Parameter |
|------|--------|--------------|
| Simple transfer | `pipette.transfer(vol, src, dest)` | `new_tip='always'` for cross-contamination prevention |
| Serial dilution | `pipette.transfer(vol, src, dest, mix_after=(3, vol))` | Mix thoroughly after each transfer |
| Multi-dispense | `pipette.distribute(vol, src, dest_list)` | Single aspiration, multiple dispenses (saves tips) |
| Consolidate | `pipette.consolidate(vol, src_list, dest)` | Multiple aspirations into one well |
| Mixing | `pipette.mix(3, vol, well)` | Repeat count, volume, location |

### Protocol Validation Checklist
```
- [ ] apiLevel matches installed OT-2/Flex software version
- [ ] Labware definitions exist (check opentrons.com/labware-library)
- [ ] Total tip usage ≤ available tips (count before running)
- [ ] Aspirate volume ≤ pipette max (P20: 20 μL, P300: 300 μL, P1000: 1000 μL)
- [ ] Blow out after every dispense (prevent droplet carryover)
- [ ] new_tip='always' for sample-to-sample transfers (prevent cross-contamination)
- [ ] Dead volume accounted for (tubes: 50–100 μL, troughs: 200–500 μL)
- [ ] Simulate before running: opentrons_simulate protocol.py
```

## 96/384-Well Plate Layouts

### Standard Layout Generator
```python
import pandas as pd
import string

def create_plate_layout(samples, controls, replicates=3, plate_size=96):
    """Generate plate layout with samples, controls, and NTCs."""
    rows = list(string.ascii_uppercase[:8 if plate_size == 96 else 16])
    cols = list(range(1, 13 if plate_size == 96 else 25))

    layout = pd.DataFrame(index=rows, columns=cols, data='')
    well_list = [(r, c) for r in rows for c in cols]
    idx = 0

    # NTC (no-template control) — last column
    for r in rows:
        layout.loc[r, cols[-1]] = 'NTC'

    # Positive control — second-to-last column
    for r in rows:
        layout.loc[r, cols[-2]] = controls.get('positive', 'POS_CTRL')

    # Samples in triplicates
    for sample in samples:
        for rep in range(replicates):
            if idx < len(well_list) - (2 * len(rows)):
                r, c = well_list[idx]
                layout.loc[r, c] = f"{sample}_R{rep+1}"
                idx += 1

    return layout

# Export
layout = create_plate_layout(['S01','S02','S03'], {'positive': 'POS'})
layout.to_csv('plate_layout.csv')
layout.to_excel('plate_layout.xlsx')
```

### Plate Layout Rules
```
- [ ] NTC (no-template control) on every plate — minimum 3 wells
- [ ] Positive control on every plate — known concentration
- [ ] Inter-plate calibrator if multi-plate experiment
- [ ] Randomize sample positions to reduce edge effects
- [ ] Document layout in plate map file (CSV or Excel) before running
- [ ] Include plate barcode/ID in filename and metadata
```

## Barcode & Sample Tracking

### Sample ID Schema
```
Format: [PROJECT]-[SPECIMEN]-[PATIENT]-[ALIQUOT]-[DATE]
Example: URO-PL-0042-A1-20250324

URO     = UroDETECT project
PL      = Plasma (alternatives: SE=Serum, UR=Urine, TI=Tissue, BF=Buffy coat)
0042    = Patient sequential ID (zero-padded)
A1      = Aliquot 1 (A=primary, B=backup, C=research)
20250324 = Collection date (YYYYMMDD)
```

### Tracking Database Schema
```sql
CREATE TABLE samples (
    sample_id VARCHAR(30) PRIMARY KEY,    -- barcode value
    project VARCHAR(10) NOT NULL,
    specimen_type VARCHAR(5) NOT NULL,    -- PL, SE, UR, TI, BF
    patient_id VARCHAR(10) NOT NULL,
    aliquot VARCHAR(5) NOT NULL,
    collection_date DATE NOT NULL,
    processed_date DATE,
    storage_location VARCHAR(50),         -- freezer-shelf-box-position
    freeze_thaw_cycles INT DEFAULT 0,
    volume_ul DECIMAL(10,1),
    hemolysis_index VARCHAR(5),           -- 0, 1+, 2+, 3+
    operator VARCHAR(50),
    status VARCHAR(20) DEFAULT 'stored',  -- stored, in-use, depleted, discarded
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sample_events (
    event_id SERIAL PRIMARY KEY,
    sample_id VARCHAR(30) REFERENCES samples(sample_id),
    event_type VARCHAR(20),               -- thawed, aliquoted, tested, shipped
    event_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    operator VARCHAR(50),
    details TEXT
);
```

## Pipetting Worklist Generation

### Hamilton / Tecan Worklist Format
```python
def generate_worklist(transfers, filename='worklist.gwl'):
    """Generate Gemini Worklist (GWL) for Hamilton/Tecan liquid handlers."""
    lines = []
    for t in transfers:
        # A;src_rack;src_pos;;vol;dst_rack;dst_pos;;
        lines.append(f"A;{t['src_rack']};{t['src_pos']};;{t['volume']};;"
                     f"{t['dst_rack']};{t['dst_pos']};;")
    with open(filename, 'w') as f:
        f.write('\n'.join(lines))

# Example: cherry-pick from source plate to destination
transfers = [
    {'src_rack': 'Source1', 'src_pos': 'A1', 'volume': 10.0,
     'dst_rack': 'Dest1', 'dst_pos': 'A1'},
    {'src_rack': 'Source1', 'src_pos': 'B3', 'volume': 10.0,
     'dst_rack': 'Dest1', 'dst_pos': 'A2'},
]
generate_worklist(transfers)
```

## Serial Dilution Automation
```python
def serial_dilution_protocol(start_conc, dilution_factor, n_points, total_vol_ul):
    """Calculate volumes for serial dilution."""
    transfer_vol = total_vol_ul / dilution_factor
    diluent_vol = total_vol_ul - transfer_vol
    concentrations = [start_conc / (dilution_factor ** i) for i in range(n_points)]

    print(f"Transfer volume: {transfer_vol:.1f} μL")
    print(f"Diluent volume:  {diluent_vol:.1f} μL per well")
    print(f"Total volume:    {total_vol_ul:.1f} μL per well")
    print("\nConcentration series:")
    for i, conc in enumerate(concentrations):
        print(f"  Point {i+1}: {conc:.4g}")
    return concentrations, transfer_vol, diluent_vol

# Example: 5-point 1:3 dilution starting at 100 nM
serial_dilution_protocol(100, 3, 5, 150)
```

## LIMS Integration Patterns
```python
# Common LIMS API pattern (LabVantage, STARLIMS, LabWare)
import requests

class LIMSClient:
    def __init__(self, base_url, api_key):
        self.base_url = base_url
        self.headers = {'Authorization': f'Bearer {api_key}', 'Content-Type': 'application/json'}

    def register_sample(self, sample_id, metadata):
        return requests.post(f"{self.base_url}/samples",
                           json={'sample_id': sample_id, **metadata},
                           headers=self.headers)

    def update_result(self, sample_id, assay, result):
        return requests.put(f"{self.base_url}/samples/{sample_id}/results",
                          json={'assay': assay, 'result': result},
                          headers=self.headers)

    def get_chain_of_custody(self, sample_id):
        return requests.get(f"{self.base_url}/samples/{sample_id}/events",
                          headers=self.headers)
```

Cross-reference: `DrKoduru-Research:bioml-pipeline` for downstream qPCR data analysis after automated plate setup.
Cross-reference: `DrKoduru-Research:clinical-study-design` for biospecimen collection SOPs that feed into automated workflows.
