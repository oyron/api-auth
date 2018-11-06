#!/bin/bash

az login
az account set --subscription "VanDamme"
az appservice plan create --name LibraryOyronSP --resource-group APIWorkshop --sku B1 --is-linux --location "North Europe"
az webapp create --resource-group APIWorkshop --plan LibraryOyronSP --name library-oyron --runtime "NODE|10.1" --deployment-local-git
git remote add azure https://oyron@library-oyron.scm.azurewebsites.net:443/library-oyron.git
git push azure master