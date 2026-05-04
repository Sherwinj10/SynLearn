# Git Push Fix Instructions

We missed one tiny thing! Your local Git history has several "draft" commits from our previous attempts, and one of those older commits still has the large file tracked the "wrong" way (without LFS). Hugging Face rejects the push if *any* commit being pushed contains a >10MB file without LFS.

To fix this, we will squash all your unpushed commits into a single, clean commit where LFS is properly configured from the start.

Please run these commands **one by one in this exact order**:

### 1. Reset your local commits (this keeps all your files and work safe!)
```bash
git reset --soft origin/main
```

### 2. Make sure LFS is tracking the files
```bash
git lfs track "*.pkl"
```

### 3. Add everything and commit as one clean package
```bash
git add .
git commit -m "feat: upgrade model to 136 features, refresh frontend, and add model via LFS"
```

### 4. Push to Hugging Face
```bash
git push origin main
```

*(You can delete this file after you are done!)*
