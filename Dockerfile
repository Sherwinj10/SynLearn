FROM nikolaik/python-nodejs:python3.11-nodejs20-slim

# Create user to run the app instead of root (HugginFace standard)
# First we remove the existing user at UID 1000 (usually 'pn') gracefully
RUN userdel -r $(getent passwd 1000 | cut -d: -f1) || true
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

WORKDIR $HOME/app

# Copy root contents first to get the main directories and the model file
# Changing ownership to the user
COPY --chown=user . .

# 1. Setup Backend
RUN pip install --no-cache-dir --user -r backend/requirements.txt

# 2. Setup Frontend
RUN cd frontend && npm install && npm run build

# Expose default HuggingFace space port
EXPOSE 7860

# Add executable permissions to start script
RUN chmod +x start.sh

# Run script
CMD ["./start.sh"]
