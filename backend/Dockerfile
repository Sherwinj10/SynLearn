FROM python:3.10

WORKDIR /code

# Copy requirements and install
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy all backend code into the container
COPY . /code

# Create a non-root user (Hugging Face specific requirement)
RUN useradd -m user
USER user

# Hugging face runs on port 7860
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
