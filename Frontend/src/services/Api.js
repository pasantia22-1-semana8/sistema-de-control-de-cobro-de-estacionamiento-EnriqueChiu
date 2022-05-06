const BASE_URL = 'http://localhost:8000';



async function callApi(endpoint, options={}){

  options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}



const api = {
  user:{
    login(data){
      return callApi('/user/login/',{
        method: 'POST',
        body: JSON.stringify(data)
      });
    },
    register(data){
      return callApi('/user/register/',{
        method: 'POST',
        body: JSON.stringify(data)
      })
    }
  },
  create:{
    rol(data){
      return callApi('/user/createRol/',{
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    tipoResidente(data){
      return callApi('/create/tipoResidente/',{
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    tipoVehiculo(data){
      return callApi('/create/tipoVehiculo/',{
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    tarifa(data){
      return callApi('/create/tarifa/',{
        method: 'POST',
        body: JSON.stringify(data)
      })
    }
  },
  getData:{
    tipoVehiculo(){
      return callApi('/create/tipoVehiculo/',{
        method: 'GET'
      })
    },
    tipoResidente(){
      return callApi('/create/tipoResidente/',{
        method: 'GET'
      })
    },
    rol(){
      return callApi('/user/createRol/',{
        method: 'GET'
      })
    },
    ticker(id){
      return callApi(`/create/ticker/?id=${id}`,{
        method: 'GET'
      })
    },
    tarifa(){
      return callApi(`/create/tarifa/`,{
        method: 'GET'
      })
    }
  }
}

export default api;