/**
 * Finds the countries with the most isolated agents
 * @param {[]} agentsActivityData Agents activity data
 */
const calculateMostIsolatedCountry = (agentsActivityData) => {
    const isolatedAgentsPerCountry = calculateIsolatedAgentsPerCountry(agentsActivityData);

    const isolatedAgentPerCountry = Object.keys(isolatedAgentsPerCountry.countriesIsolatedAgensHashMap)
        .map(key => ({
            country: key,
            isolatedAgentsCount: isolatedAgentsPerCountry.countriesIsolatedAgensHashMap[key].length
        }));

    // get the country with the most isolated agents
    const maxIsolatedAgentsCount = Math.max(...isolatedAgentPerCountry.map(country => country.isolatedAgentsCount));

    // return all the countries which has the highest count of isolated agents
    return isolatedAgentPerCountry.filter(country => country.isolatedAgentsCount === maxIsolatedAgentsCount);
};

const calculateIsolatedAgentsPerCountry = (agentsActivityData) => {
    let isolatedAgentsPerCountry = agentsActivityData.reduce(
        (accumulatedData, currentData) => {
            const { agent, country } = currentData;

            // init if needed
            let newAccumulatedData = initCummulatedData(accumulatedData);

            // get current agent visited locations
            let agentsVisitedCountries =
                newAccumulatedData.agentsVisitedCountriesHashMap[agent] || [];

            // get current country isolated agents
            let countriesIsolatedAgents =
                newAccumulatedData.countriesIsolatedAgensHashMap[country] || [];

            let isAgentIsolated = agentsVisitedCountries.length === 0;
            if (isAgentIsolated) {
                // bind country to an isolated agent
                agentsVisitedCountries.push(country);
                // bind an isolated agent to a country
                countriesIsolatedAgents.push(agent);
            } else {
                // remove unisolated agent from all the coutries isolated agents collection
                agentsVisitedCountries.forEach(country => unbindAgentFromCountry(
                    country, agent, newAccumulatedData.countriesIsolatedAgensHashMap[country]));
            }

            newAccumulatedData.agentsVisitedCountriesHashMap[agent] = agentsVisitedCountries;
            newAccumulatedData.countriesIsolatedAgensHashMap[country] = countriesIsolatedAgents;

            return newAccumulatedData;
        },
        {}
    );
    return isolatedAgentsPerCountry;
};

const unbindAgentFromCountry = (country, agent, visitedCounties) => {
    const agentIndex = visitedCounties.indexOf(agent);
    if (agentIndex > -1) {
        visitedCounties.splice(agentIndex, 1);
    }
};

const initCummulatedData = accumulatedData => {
    let clonedAccumulatedData = { ...accumulatedData };

    // init if needed
    if (!clonedAccumulatedData.countriesIsolatedAgensHashMap)
        clonedAccumulatedData.countriesIsolatedAgensHashMap = {};
    if (!clonedAccumulatedData.agentsVisitedCountriesHashMap)
        clonedAccumulatedData.agentsVisitedCountriesHashMap = {};

    return clonedAccumulatedData;
};

export default calculateMostIsolatedCountry;
