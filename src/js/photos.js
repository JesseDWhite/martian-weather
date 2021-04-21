export default class Photos {
    static getPhotoElements(roverName, earthDate) {
        const roverName =
        //return fetch(`https://api.nasa.gov/insight_weather/?api_key=${process.env.API_KEY}&feedtype=json&ver=1.0`)
        return fetch(`https://api.nasa.gov/mars-photos/api/v1/rover/${roverName}/photos?earth_date=${earthDate}&api_key=${process.env.API_KEY}`)
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .catch(function (error) {
                return error;
            })
    }
}
