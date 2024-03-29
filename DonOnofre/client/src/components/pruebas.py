import http.client
import json
import datetime
import pprint
 
idDeuda = "demo006"
siExiste = "update"
apiKey = "ap-ca19841501670f92e938b685"
host = "staging.adamspay.com"
path = "/api/v1/debts"
 
# Hora DEBE ser en UTC!
inicio_validez= datetime.datetime.utcnow().replace()
fin_validez = inicio_validez + datetime.timedelta(days=2)
 
# Crear modelo de la deuda
deuda = {
    "docId": idDeuda,
    "amount": {"currency": "PYG","value": "50000"},
    "label":"Aporte camiseta del equipo",
    "validPeriod":{
       "start":inicio_validez.strftime("%Y-%m-%dT%H:%M:%S"),
       "end":fin_validez.strftime("%Y-%m-%dT%H:%M:%S")
    }  
  }
 
# El post debe llevar la deuda en la propiedad "debt"
post = {"debt":deuda}
 
# Crear JSON
payload = json.JSONEncoder().encode(post).encode("utf-8")
print("payload:\n", payload)
headers = {"apikey": apiKey, "Content-Type": "application/json", "x-if-exists": siExiste}
print("\nheaders\n", headers)
conn = http.client.HTTPSConnection(host)
conn.request("POST", path , payload, headers)
print("\nconn\n",conn.__str__())
data = conn.getresponse().read().decode("utf-8")
print("\ndata\n",data)
response = json.JSONDecoder().decode(data)
 
# Datos retornan en la propiedad "debt"
 
pp = pprint.PrettyPrinter(indent=2)
if "debt" in response:
    debt=response["debt"]
    print("Deuda creada exitosamente")
    print("URL=" + debt["payUrl"])
else:
    print("# Error")
    if "meta" in response:
        pp.pprint(response["meta"])