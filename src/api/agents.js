import agentsActivity from '../data/agentsActivity';

const getAgentsActivity = async () => {
    var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(agentsActivity);
        }, 1000);
    });
    return promise;
};

export default getAgentsActivity;
