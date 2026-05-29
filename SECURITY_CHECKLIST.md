# Security Checklist

Before production:

- Protect `/admin` with role checks
- Protect `/studio` with creator/admin checks
- Add CSRF protection where needed
- Add request rate limits
- Add upload file validation
- Keep S3 bucket private
- Use CloudFront origin access controls
- Store secrets outside git
- Log admin actions to AuditLog
- Add backups for RDS
- Add monitoring and alerting
- Add account suspension and appeal flows
- Add support ticket workflows
- Review terms, privacy, creator agreement, and payout policies
