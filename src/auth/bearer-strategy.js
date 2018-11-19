const BearerStrategy = require('passport-azure-ad').BearerStrategy;

const tenantName    = "StatoilSRM";
const clientID      = "86a932f7-e20c-48b9-a9a0-70bddb783f34";
const options = {
    identityMetadata: `https://login.microsoftonline.com/${tenantName}.onmicrosoft.com/.well-known/openid-configuration`,
    clientID: clientID,
    loggingLevel: 'warn'
};
const groupToRoleMapping = new Map([
    ['167818bc-d792-4fab-9776-d99fc39ccbb9', 'LibraryReader'],
    ['409e1942-f763-4a17-96a6-722256b202f2', 'LibraryAdmin']]);

const authenticationStrategy = new BearerStrategy(options, (token, done) => {
    const user = {
        email: token.upn,
        name: token.name,
        roles: findRoles(token.groups)
    };
    return done(null, user, token);
});

function findRoles(userGroups) { //map relevant security groups to application roles
    return userGroups
        .filter(group => groupToRoleMapping.has(group))
        .map(group => groupToRoleMapping.get(group))
}

module.exports = authenticationStrategy;