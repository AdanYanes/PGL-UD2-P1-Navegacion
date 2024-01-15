const DOGS_FACTS_API_URL = 'http://dog-api.kinduff.com';
const DOGS_IMGS_URL = 'https://dog.ceo/api/breeds/image/random';
const FACTS_PATH = '/api/facts';

type DogFactsJsonResponse = {
  facts: string[];
  success: boolean;
}

type DogImageJsonResponse = {
  message: string;
  status: string;
}

const getInitRequest = (httpVerb: string): RequestInit => {
  const init: RequestInit = {
    method: httpVerb,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  return init;
}

export const getDogsImageUrl = async (): Promise<string> =>{
  const request: RequestInfo = `${DOGS_IMGS_URL}` ;
  const response = await fetch(request, getInitRequest('GET'))
  const json: DogImageJsonResponse = await response.json()

  if (json != null) {
    return json.message
  }

  return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPvkGsQrlqGs2enXtv3uAdS3Ilp_OE5SfaTQ&usqp=CAU';
}

export const getDogsFacts = async (totalFacts: string): Promise<string[]> => {
  let facts: string[] = [];

  const request: RequestInfo = `${DOGS_FACTS_API_URL}${FACTS_PATH}?number=${totalFacts}` ;
  const response = await fetch(request, getInitRequest('GET'))
  const json: DogFactsJsonResponse = await response.json()

  if (json != null) {
    facts = json.facts
  }

  return facts;
}