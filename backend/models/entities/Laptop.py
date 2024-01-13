class Laptop():

    def __init__(self, id, marca=None,modelo=None,ram=None,placa=None,precio=None) -> None:
        self.id = id
        self.marca = marca
        self.modelo = modelo
        self.ram = ram
        self.placa = placa
        self.precio = precio

    def to_JSON(self):
        return {
            'id': self.id,
            'marca': self.marca,
            'modelo': self.modelo,
            'ram': self.ram,
            'placa': self.placa,
            'precio': self.precio
        }