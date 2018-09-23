class Api::JobsController < ApplicationController
  # before_action :set_job, only: [:show, :edit, :update, :destroy]

  # Get all job when page start
  def index
    render json:Job.all
  end

   def create
      job = Job.create(job_params)
      render json: job
    end

    def destroy
      Job.destroy(params[:id])
    end

    def update
      job = Job.find(params[:id])
      job.update_attributes(job_params)
      render json: job
    end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_job
      @job = Job.find(params[:id])
    end

    # only require job params and only permit defined keys to pass to model
    def job_params
      params.require(:job).permit(:title, :joburl, :applieddate, :company, :stack, :status, :address)
    end
end
