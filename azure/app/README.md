# TASK 1 - Azure : Deploy Portal/Frontend to Azure App Service


## Branching and Deployment strategy 

### Develop a feature
```
git checkout main
git pull origin main
git checkout -b feature/my-feature
# ... do work ...
git push origin feature/my-feature
```

### Deploy to test environment
GitHub Actions workflows `.github/workflows/deploy-test-env.yaml` and `.github/workflows/scan-codeql.yaml` will run automatically when a new pull request (PR) is created or new changes are pushed to any `feature/*` branch. <br>
Azure App Service staging: https://testing-flexidev-a5b7bthsd8c7ekgf.australiacentral-01.azurewebsites.net/login

#### ✅ Requirements to Merge into `main`

To merge a PR into the `main` branch, the following three requirements must be fulfilled:

1. ✅ The `.github/workflows/deploy-test-env.yaml` workflow must pass  
   &nbsp;&nbsp;&nbsp;&nbsp;This deploys the code changes to the test environment (Azure App Service named `testing-flexidev`).
![PR failing checks](azure/app/images/image2.png) 

2. ✅ The `.github/workflows/scan-codeql.yaml` workflow must pass  
   &nbsp;&nbsp;&nbsp;&nbsp;This runs a CodeQL scan to detect potential security vulnerabilities.
![PR failing checks](azure/app/images/image3.png)   

3. ✅ The PR must receive at least one approval from another engineer.
![PR needs approval](azure/app/images/image4.png)

---

A PR can **only be merged once all three requirements are met.**
#### ✅ PR that **has passed** all checks:
![PR passing checks](azure/app/images/image.png)<br><br>


### Deploy to Production
Azure App Service production: https://production-flexidev-d2e8czhjadgfhzbx.australiacentral-01.azurewebsites.net/login <br>
To create new tag for production, run below command:
```
# Create new Tag
git tag -a v1.3.0 -m "Release v1.3.0"
git push origin v1.3.0
```
When new tag is create, `./github/workflows/build-tag.yaml` will be triggered.
![build docker image from a new tag](azure/app/images/image6.png)


To deploy to production, run Github workflow `/github/workflows/deploy-production-env.yaml`.
![Deploy to Production env](azure/app/images/image5.png)
Check available tags [here](https://github.com/tampubolon/flexidev-devops/tags).

### 🔁 Rollback to previous version
```
# If v1.2.0 was stable
git checkout tags/v1.2.0 -b rollback/v1.2.0
git push origin rollback/v1.2.0
# CI/CD deploys rollback branch or tag v1.2.0 to production
```

### Branching and Deployment Flow
```
                            ┌────────────┐
                            │  feature/* │ ← your local development
                            └─────┬──────┘
                                  │
                                  ▼
                        ┌────────────────────┐
                        │ deploy to test env │ ← https://testing-flexidev-a5b7bthsd8c7ekgf.australiacentral-01.azurewebsites.net/login
                        └──────────┬─────────┘
                                   │
               [merge/rebase after deploy to test env OK]
                                   │
                                   ▼
                               ┌────────┐
                               │ main   │ ← always production-ready
                               └────┬───┘
                                    │
                              [tag release]
                                    │
                                    ▼
                        ┌────────────────────┐
                        │ tag: v1.2.0        │ ← used for Production deployment: https://production-flexidev-d2e8czhjadgfhzbx.australiacentral-01.azurewebsites.net/login
                        └────────────────────┘
                                     │
                          ┌──────────┴──────────┐
                          │                     │
               [rollback] ▼                     ▼ [hotfix]
         ┌────────────────────┐      ┌────────────────────┐
         │ rollback/v1.2.0    │      │ hotfix/urgent-fix  │
         └────────────────────┘      └────────────────────┘
```
<br>
