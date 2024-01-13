from database.db import get_connection
from .entities.Laptop import Laptop
import uuid


class LaptopModel():
    
   #Obtener de la base de datos todos los registros de Usuarios
    @classmethod #Etiqueta para utilizar el método get_laptops sin instanciarlo 
    def get_Laptops(self):
        try:
            conn = get_connection()
            Laptops = []

            with conn.cursor() as cursor:
                cursor.execute("SELECT id,marca,modelo,ram,placa,precio FROM laptops")
                resultset = cursor.fetchall()

                for row in resultset:
                    laptop = Laptop(row[0],row[1],row[2],row[3],row[4],row[5])#ID,Marca,Modelo,RAM,Placa,Precio
                    Laptops.append(laptop.to_JSON())

            conn.close()
            return Laptops
        except Exception as ex:
            raise Exception(ex)
    
    #Obtener de la base de datos un solo Usuario por su id
    @classmethod 
    def get_Laptop(self, id):
        try:
            conn = get_connection()

            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM laptops WHERE id = '%s'"% (id))
                row = cursor.fetchone()

            laptop = None
            laptop = Laptop(row[0],row[1],row[2],row[3],row[4],row[5])

            laptop = laptop.to_JSON()
                
            conn.close()
            return laptop
        except Exception as ex:
            raise Exception(ex)
        
    #Añadir un Usuario a la tabla Usuarios en la base de datos    
    @classmethod 
    def add_Laptop(self, Laptop):
        try:
            conn = get_connection()

            with conn.cursor() as cursor:
                cursor.execute("""INSERT INTO laptops (id,marca,modelo,ram,placa,precio) 
                               VALUES (%s, %s, %s, %s, %s, %s)""",(Laptop.id, Laptop.marca, Laptop.modelo, Laptop.ram, Laptop.placa, Laptop.precio))
                affected_rows = cursor.rowcount
                conn.commit()

            conn.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
        
    #Actualizar un usuario de la tabla Usuarios en la base de datos    
    @classmethod 
    def update_Laptop(self, Laptop):
        try:
            conn = get_connection()

            with conn.cursor() as cursor:
                cursor.execute("""UPDATE laptops SET marca=%s,modelo=%s,ram=%s,placa=%s,precio=%s
                               WHERE id = %s""",(Laptop.marca, Laptop.modelo, Laptop.ram, Laptop.placa, Laptop.precio, Laptop.id))
                affected_rows = cursor.rowcount
                conn.commit()

            conn.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
        
    #Eliminar una laptop de la tabla laptops en la base de datos
    @classmethod 
    def delete_Laptop(self, id):
        try:
            conn = get_connection()

            with conn.cursor() as cursor:
                cursor.execute("DELETE FROM laptops WHERE id = '%s'" % id)
                affected_rows = cursor.rowcount
                conn.commit()

            conn.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex) 