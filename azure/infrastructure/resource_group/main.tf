resource "azurerm_resource_group" "rg" {
  name     = "martinus-trial-rg"
  location = "East US"

  tags = {
    pic        = "martinus"
    owner      = "alephtech.ai"
    tf_project = "alephapp/infrastructure/acr/"
  }
}