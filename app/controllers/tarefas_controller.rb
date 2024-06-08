class TarefasController < ApplicationController
    skip_before_action :verify_authenticity_token
    
    def index
      tarefa = Tarefa.all
      render json: tarefa
    end

    def show
      tarefa = Tarefa.find(params[:id])
      if tarefa
        render json: tarefa, status: :ok
      else 
        render json: { error: "Membro não encontrado" }, status: :not_found
      end
    end

    def finalizar
      tarefa = Tarefa.find(params[:id])
      debugger
      if tarefa.finalizar
        render json: tarefa, status: :ok
      else
        render json: { error: tarefa.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def create
        tarefa = Tarefa.new(tarefa_params)
        if tarefa.save
          render json: tarefa, status: :created
        else
          render json: { error: tarefa.errors.full_messages }, status: :unprocessable_entity
        end
    end
      
  
    def update
      tarefa = Tarefa.find_by(id: params[:id])
      if tarefa
        if tarefa.update(tarefa_params)
          render json: tarefa, status: :ok
        else
          render json: { error: tarefa.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: "Tarefa não encontrada" }, status: :not_found
      end
    end

  
    def destroy
      tarefa = Tarefa.find_by(id: params[:id])
      if tarefa.destroy
        render json: {}, status: :not_content
      else
        render json: { error: "Tarefa não encontrada" }, status: :not_found
      end
    end

    private

    def tarefa_params
      params.require(:tarefa).permit(:membro_id, :nome, :descricao, :finalizada, :prioridade)
    end
  
  end
  