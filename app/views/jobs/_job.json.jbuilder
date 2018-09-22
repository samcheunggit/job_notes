json.extract! job, :id, :title, :joburl, :applieddate, :company, :stack, :status, :address, :created_at, :updated_at
json.url job_url(job, format: :json)
