#!/bin/bash

#az login
az account set --subscription "VanDamme"
az appservice plan create --name LibrarySP --resource-group DataPlatformOYRONRGDev --sku B1 --is-linux --location "North Europe"
az webapp create --resource-group DataPlatformOYRONRGDev --plan LibrarySP --name library-api --runtime "NODE|10.1" --deployment-local-git
git remote add azure https://oyron@library-api.scm.azurewebsites.net:443/library-api.git
git push azure master
az ad app create --display-name library-api --homepage http://localhost:3100 --identifier-uris http://www.equinor.com/library-api