class MembrosController < ApplicationController

    skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy]

    def index
      membros = Membro.all
      render json: membros
    end
  
    def new
    end
  
    def create
      membro = Membro.new(membro_params)
      if membro.save
        redirect_to membro, notice: 'Membro criado com sucesso.'
      else
        render json: membro.errors, status: :unprocessable_entity
      end
    end
  
    def show
      membro = Membro.find(params[:id])
      if membro
        render json: membro, status: :ok
      else 
        render json: { error: "Membro não encontrado" }, status: :not_found
      end
    end
  
    def edit
      membro = Membro.find(params[:id])
    end
  
    def update
        membro = Membro.find_by(id: params[:id])
      
        if membro
          if membro.update(membro_params)
            render json: membro, status: :ok
          else
            render json: membro.errors, status: :unprocessable_entity
          end
        else
          render json: { error: "Membro não encontrado" }, status: :not_found
        end
      end

    def destroy
        membro = Membro.find_by(id: params[:id])
      
        if membro
          membro.destroy
          render json: membro, status: :ok
        else
          render json: { error: "Membro não encontrado1" }, status: :not_found
        end
    end
  
    private
  
    def membro_params
      params.require(:membro).permit(:nome, :email)
    end
  end
  