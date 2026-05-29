param(
  [string]$Region = "us-east-2",
  [string]$RepositoryName = "fanspot-test",
  [string]$ImageTag = "latest"
)

$ErrorActionPreference = "Stop"

Write-Host "FanSpot ECS image build/push" -ForegroundColor Cyan
Write-Host "Region: $Region"
Write-Host "Repository: $RepositoryName"
Write-Host "Tag: $ImageTag"

$AccountId = aws sts get-caller-identity --query Account --output text
if (-not $AccountId) {
  throw "Could not read AWS account ID. Run aws configure first."
}

$Registry = "$AccountId.dkr.ecr.$Region.amazonaws.com"
$ImageUri = "$Registry/$RepositoryName`:$ImageTag"

Write-Host "Checking ECR repository..."
aws ecr describe-repositories --repository-names $RepositoryName --region $Region *> $null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Creating ECR repository $RepositoryName..."
  aws ecr create-repository --repository-name $RepositoryName --region $Region *> $null
}

Write-Host "Logging Docker into ECR..."
aws ecr get-login-password --region $Region | docker login --username AWS --password-stdin $Registry

Write-Host "Building Docker image..."
docker build -t "$RepositoryName`:$ImageTag" .

Write-Host "Tagging Docker image..."
docker tag "$RepositoryName`:$ImageTag" $ImageUri

Write-Host "Pushing Docker image to ECR..."
docker push $ImageUri

Write-Host ""
Write-Host "Done. Use this image URI in ECS:" -ForegroundColor Green
Write-Host $ImageUri -ForegroundColor Green
