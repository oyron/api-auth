const BearerStrategy = require('passport-azure-ad').BearerStrategy;

const tenantName    = "StatoilSRM";
const clientID      = "86a932f7-e20c-48b9-a9a0-70bddb783f34";

const options = {
    identityMetadata: `https://login.microsoftonline.com/${tenantName}.onmicrosoft.com/.well-known/openid-configuration`,
    clientID: clientID,
    loggingLevel: 'info'
};

const authenticationStrategy = new BearerStrategy(options, (token, done) => {
    const user = {
        email: token.upn,
        name: token.name,
        roles: ["LibraryReader"]
    };
    return done(null, user, token);
});

module.exports = authenticationStrategy;