from flask import Blueprint, jsonify, request                
import uuid
#Entities
from models.entities.Laptop import Laptop
#Models
from models.LaptopModel import LaptopModel

main = Blueprint('Laptop_blueprint',__name__)

@main.route('/')
def get_Laptops():
    try:
        Laptops = LaptopModel.get_Laptops()

        if Laptops != None:                 
            return jsonify(Laptops)             
        else:                            
            return jsonify({}),404  
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/:<id>')                       #Route para obtener una laptop
def get_Laptop(id):
    try:
        Laptop = LaptopModel.get_Laptop(id)
        if Laptop != None:                     #Si la laptop es encontrada (No Null)
            return jsonify(Laptop)             #la en enviamos en JSON
        else:                               #Si la laptop no fue encontrada (Null)
            return jsonify({}),404          #enviamos un JSON vacio, con cod. de error 404
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
    
    
@main.route('/add',methods=['POST'])        #Route para crear una laptop      
def add_Laptop():
    try:
        # Validación de los datos recibidos
        if(int(request.json['ram']) == 0 or int(request.json['precio']) < 80000):
            return jsonify({'message': "Datos mal ingresados, verifiquelos"}), 500
        else:
            if(request.json['marca'] ==" " or request.json['modelo'] ==" " or 
               request.json['placa'] ==" " or request.json['marca'] =="" or request.json['modelo'] =="" or 
               request.json['placa'] ==""):
                return jsonify({'message': "No deje Espacios vacios"}), 500
            else:
                marca = request.json['marca']
                modelo = request.json['modelo']
                ram = int(request.json['ram'])
                placa = request.json['placa']
                precio = int(request.json['precio'])   
                id = uuid.uuid4()
                
                new_Laptop = Laptop(str(id),marca,modelo,ram,placa,precio)

                affected_rows = LaptopModel.add_Laptop(new_Laptop)

        if affected_rows == 1:
            return jsonify(new_Laptop.id)
        else:
            return jsonify({'message': "Error on Insert"}), 500
              
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
    

@main.route('/update/:<id>',methods=['PUT'])        #Route para actualizar una laptop      
def update_Laptop(id):
    try:
        # Validación de los datos recibidos
        if(int(request.json['ram']) == 0 or int(request.json['precio']) < 80000):
            return jsonify({'message': "Datos mal ingresados, verifiquelos"}), 500
        else:
            if(request.json['marca'] ==" " or request.json['modelo'] ==" " or 
            request.json['placa'] ==" " or request.json['marca'] =="" or request.json['modelo'] =="" or 
            request.json['placa'] ==""):
                return jsonify({'message': "Datos Erroneos, verifiquelos"}), 500
            else:
                marca = request.json['marca']
                modelo = request.json['modelo']
                ram = int(request.json['ram'])
                placa = request.json['placa']
                precio = int(request.json['precio'])
        
        laptop = Laptop(id,marca,modelo,ram,placa,precio) 

        affected_rows = LaptopModel.update_Laptop(laptop)
        
        if affected_rows == 1:
            return jsonify(laptop.id)
        else:
            return jsonify({'message': "No Laptop updated"}), 500
              
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
    
        
@main.route('/delete/:<id>',methods=['DELETE'])        #Route para eliminar una laptop      
def delete_Laptop(id):
    try:
        affected_rows = LaptopModel.delete_Laptop(id)

        if affected_rows == 1:
            return jsonify(id)
        else:
            return jsonify({'message': "No Laptop deleted"}), 404
              
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500