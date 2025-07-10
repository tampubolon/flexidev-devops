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

### ✅ Merge to test environment
```
git checkout test
git merge feature/my-feature
git push origin test
# CI/CD deploys test branch to test environment
```

### Deploy to Production
```
git checkout main
git merge test
git push origin main

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
                                ┌────────┐
                                │ test   │ ← shared testing branch
                                └────┬───┘
                                     │
                      [merge/rebase after testing OK]
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