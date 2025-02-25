
export async function getGeoLocation() {
    console.log('Getting Geolocation...');
    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }),
                (error) => reject(error)
            );
        });
    } else {
        throw new Error('Geolocation is not supported by this browser.');
    }
}
