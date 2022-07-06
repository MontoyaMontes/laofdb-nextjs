import csv
import datetime

archivoMorfometriaIzquierda = './MorfometriaIzquierda.csv'
archivoPesoMandibulas = './PesoMandibulas.csv'
archivoMorfologiasMandibulas = './MorfologiasMandibulas.csv'

camposMorfologia = [
    'marcaTemporal',
    'evaluador',
    'nombre',
    'numeroMandibula',
    'idCodigoMandibula',
    'impresionTotalIzquierda',
    'mentonIzquierda',
    'anguloMandibularIzquierda',
    'anguloMandibularDerecha',
    'eversionGonialIzquierda',
    'eversionGonialDerecha',
    'margenInferiorIzquierda',
    'cuerpoMandibularIzquierda',
    'ramaMandibularIzquierda',
    'ramaMandibularDerecha',
    'incisuraMandibularEscotaduraSigmoideaIzquierda',
    'incisuraMandibularEscotaduraSigmoideaDerecha',
    'procesoCondilarIzquierda',
    'procesoCondilarDerecha',
    'procesoCoronoideIzquierda',
    'procesoCoronoideDerecha',
    'archoDentalIzquierda',
    'dientesNumero',
    'comentarios',
    'dienteIzquierda']

# Nombre, num mandibula van aparte, id es con que se identifica e FK
camposPesos = [ 
    'marcaTemporal',
    'evaluador',
    'nombre',
    'numeroMandibula',
    'idCodigoMandibula',
    'pesoMiligramos',
    'observacionesRelacionadasAPeso',
    'dientes',
    'cuantos',
    'cuales48',
    'cuales47',
    'cuales46',
    'cuales45',
    'cuales44',
    'cuales43',
    'cuales42',
    'cuales41',
    'cuales38',
    'cuales37',
    'cuales36',
    'cuales35',
    'cuales34',
    'cuales33',
    'cuales32',
    'cuales31',
    'comentarios']

camposMorfometriaIzquierda = [
    'marcaTemporal',
    'evaluador',
    'nombre',
    'numeroMandibula',
    'idCodigoMandibula',    
    'Altura máxima de la rama (XRL en milímetros)',
    'Anchura bigoniaca (GOG en milímetros)',
    'Ángulo mandibular (MAN)',
    'Anchura bicondílea (CDL en milímetros)',
    'Anchura máxima de la rama (MRL en milímetros)',
    'Anchura mínima de la rama (WRL en milímetros)',
    'Longitud de la mandíbula (MLT en milímetros)',
    'Altura del cuerpo de la mandíbula (HML en milímetros)',
    'Anchura del cuerpo de la mandíbula (TML en milímetros)',
    'Altura mentoniana (GNI en milímetros)',
    'comentarios']

def convertMongo(archivoExcel, campos):
        
    documentos = archivoExcel.replace("./","").replace(".csv","DB.txt")
    
    def convert_date(dateString):
        dateTime = dateString.split(" ")
        dateFormated = datetime.datetime.strptime(dateTime[0], "%m/%d/%Y").strftime("%Y-%m-%d")
        return f'{dateFormated}T{dateTime[1]}Z'

    def convert_to_BSON(line):
        # Cambiar a un for en 
        res = ""
        i = 0
        while i < len(line):
            # Si el tiempo está en otro lado se cambia
            if i == 0:
                timeFormated = convert_date(line[i])
                res += f'"{campos[i]}":"{timeFormated}",'
                i = i+1
            # Borra saltos de linea para evitar errores
            ln = line[i].strip("\n")
            res += f'"{campos[i]}":"{ln}",'
            i = i+1
        # Elimina la coma en el último valor
        res = res[:-1]
        return "{"+res+"}"


    with open(archivoExcel) as csv_file:
        file1 = open(documentos, "w") 
        
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        documents = ""
        for row in csv_reader:
            # Limit for test
            #if line_count == 50:
            #    print("x")
            if line_count == 0:
                print(f'{", ".join(row)}')
                line_count += 1
            else:
                print(convert_to_BSON(row))
                documents += f'{convert_to_BSON(row)},\n'
                line_count += 1
        print(f'Processed {line_count-1} docs.')
        documents = documents[:-2]
        file1.write(f'[{documents}]')
        file1.close() 
        
#convertMongo(archivoPesoMandibulas, camposPesos)    
convertMongo(archivoMorfometriaIzquierda, camposMorfometriaIzquierda)
    
        