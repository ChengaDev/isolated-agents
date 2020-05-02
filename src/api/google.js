import distanceData from '../data/distances';

const getDistanceMetrix = async (origins, destinations) => {
    var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve({
                destination_addresses: origins,
                origin_addresses: destinations,
                rows: distanceData,
                status: 'OK'
            });
        }, 1000);
    });
    return promise;
};

export default getDistanceMetrix;
