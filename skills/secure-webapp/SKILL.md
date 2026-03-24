---
name: secure-webapp
description: Use when building any web application, API, scientific dashboard, reporting service, or mobile app — enforces security-first patterns including auth, RBAC, input validation, and HIPAA/CLIA-aware data handling
---

# Secure Web App & Scientific App Patterns

## Security Checklist (every app)
- [ ] Authentication (JWT or OAuth — never hardcode credentials)
- [ ] Role-based access control (RBAC)
- [ ] Input validation & sanitization (Zod / Pydantic)
- [ ] HTTPS enforced — no HTTP in production
- [ ] Secrets in environment variables only (never in code)
- [ ] SQL injection prevention (ORM / parameterized queries only)
- [ ] Rate limiting on all API endpoints
- [ ] Error messages never expose stack traces to client
- [ ] PHI/PII: encrypted at rest + in transit if clinical data
- [ ] Audit log: all patient data access logged (who, when, what)

## Stack Defaults by App Type
| App Type | Backend | Frontend | Auth | DB |
|----------|---------|----------|------|-----|
| Clinical Dashboard | FastAPI + Python | Next.js + shadcn/ui | JWT + RBAC | PostgreSQL (Neon) |
| Diagnostic Report | FastAPI | Streamlit / Next.js | Session + JWT | SQLite / PostgreSQL |
| Scientific Mobile App | FastAPI | React Native + Expo | JWT | SQLite + cloud sync |
| Admin/Lab Portal | FastAPI | Next.js + Tailwind | Clerk (OIDC) | Neon Postgres |
| Public Bioinfo Tool | FastAPI | React | API key | SQLite |
| Business App | Next.js API routes | Next.js + shadcn/ui | Clerk | Neon + Upstash |

## FastAPI Security (Backend)
```python
from pydantic import BaseModel, validator
from fastapi import Depends, HTTPException

class DiagnosticInput(BaseModel):
    patient_id: str
    gene_values: list[float]

    @validator('gene_values')
    def validate_cq_range(cls, v):
        if any(x < 0 or x > 50 for x in v):
            raise ValueError('Cq values must be 0-50')
        return v

def require_role(role: str):
    def checker(user=Depends(get_current_user)):
        if user.role != role:
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return user
    return checker
```

## Next.js Security (Frontend)
```typescript
// app/api/[route]/route.ts — always server-side auth check
import { auth } from '@/lib/auth'
import { z } from 'zod'

const Schema = z.object({ patientId: z.string().min(1).max(50) })

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const body = Schema.safeParse(await req.json())
  if (!body.success) return Response.json({ error: 'Invalid input' }, { status: 400 })
}
```

## Clinical Data Rules (HIPAA/CLIA)
- PHI: encrypt at DB level (pgcrypto) or dedicated secrets vault
- Audit log: every patient data read/write → log (userId, timestamp, action, recordId)
- De-identification: strip all 18 HIPAA identifiers before ML training
- Minimum necessary: users see only their own patients/samples
- CLIA: traceability — every result must link to operator, instrument, reagent lot, date

## PDF/Report Generation
```python
# Use weasyprint or reportlab — never allow user-controlled HTML templates
import html
safe_value = html.escape(str(patient_field))  # Always escape before inserting
# Include: lab header, patient ID (de-identified if needed), result, reference range, interpretation
```

## Scientific Mobile App Extras
- Offline-first: SQLite local cache, sync to cloud when connected
- Camera/barcode: scan sample IDs for traceability
- Result alerts: push notification for critical values
- Export: PDF report + CSV data export from mobile
