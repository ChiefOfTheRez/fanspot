output "media_bucket" {
  value = aws_s3_bucket.media.bucket
}

output "app_secret_name" {
  value = aws_secretsmanager_secret.app.name
}

output "log_group" {
  value = aws_cloudwatch_log_group.app.name
}
