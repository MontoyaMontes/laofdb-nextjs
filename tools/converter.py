import csv
import datetime

archivoExcel = './morfologiasMandibulas.csv'
documentos = archivoExcel.replace("./","").replace(".csv","DB.txt")

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

def convert_date(dateString):
    dateTime = dateString.split(" ")
    dateFormated = datetime.datetime.strptime(dateTime[0], "%d/%m/%Y").strftime("%Y-%m-%d")
    return f'{dateFormated}T{dateTime[1]}Z'

def convert_to_BSON(line):
    # Cambiar a un for en 
    res = ""
    i = 0
    while i < len(line):
        # Si el tiempo está en otro lado se cambia
        if i == 0:
            timeFormated = convert_date(line[i])
            res += f'"{camposMorfologia[i]}":"{timeFormated}",'
            i = i+1
        # Borra saltos de linea para evitar errores
        ln = line[i].strip("\n")
        res += f'"{camposMorfologia[i]}":"{ln}",'
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
            #print(f'{", ".join(row)}')
            line_count += 1
        else:
            #print(convert_to_BSON(row))
            documents += f'{convert_to_BSON(row)},\n'
            line_count += 1
    print(f'Processed {line_count-1} docs.')
    documents = documents[:-2]
    file1.write(f'[{documents}]')
    file1.close() 