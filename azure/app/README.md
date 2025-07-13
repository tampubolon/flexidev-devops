# Portal/Frontend Application


## Branching and Deployment strategy 

### 🚀 Develop a feature
```
git checkout main
git pull origin main
git checkout -b feature/my-feature
# ... do work ...
git push origin feature/my-feature
```

### [ ] Deploy to test environment
GitHub Actions workflows `deploy-test-env.yaml` and `scan-codeql.yaml` will run automatically when a new pull request (PR) is created or new changes are pushed to any `feature/*` branch.

#### ✅ Requirements to Merge into `main`

To merge a PR into the `main` branch, the following three requirements must be fulfilled:

1. [ ] The `deploy-test-env.yaml` workflow must pass  
   &nbsp;&nbsp;&nbsp;&nbsp;This deploys the code changes to the test environment (Azure App Service named `testing-flexidev`).

2. [ ] The `scan-codeql.yaml` workflow must pass  
   &nbsp;&nbsp;&nbsp;&nbsp;This runs a CodeQL scan to detect potential security vulnerabilities.

3. [ ] The PR must receive at least one approval from another engineer.

---

A PR can **only be merged once all three requirements are met.**

#### ✅ PR that **has passed** all checks:
![PR passing checks](images/image.png)



### Deploy to Production
```
# Tag the release
git tag -a v1.3.0 -m "Release v1.3.0"
git push origin v1.3.0
# CI/CD deploys main or v1.3.0 tag to production
```

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
                        │ deploy to test env │ ← Az https://testing-flexidev-a5b7bthsd8c7ekgf.australiacentral-01.azurewebsites.net/login
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
                        │ tag: v1.3.0        │ ← used for deployment
                        └────────────────────┘
                                     │
                          ┌──────────┴──────────┐
                          │                     │
               [rollback] ▼                     ▼ [hotfix]
         ┌────────────────────┐      ┌────────────────────┐
         │ rollback/v1.2.0    │      │ hotfix/urgent-fix  │
         └────────────────────┘      └────────────────────┘
```
