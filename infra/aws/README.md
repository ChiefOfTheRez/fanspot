# FanSpot AWS Infrastructure Notes

The current AWS target is ECS/Fargate.

## Test resources

- ECR repository: `fanspot-test`
- ECS service: `fanspot-test`
- Container port: `3000`
- Health check path: `/api/health`
- RDS PostgreSQL database

## Security group reminder

RDS should allow PostgreSQL only from the ECS service security group.

```txt
PostgreSQL TCP 5432 from ECS security group
```

Do not expose RDS publicly for the normal app path.
