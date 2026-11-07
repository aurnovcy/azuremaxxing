import { ResourceGraphQuery } from '../types';

export const RESOURCE_GRAPH_QUERIES: ResourceGraphQuery[] = [
  {
    id: 'unattached-managed-disks',
    title: 'Unattached Managed Disks',
    description: 'Finds managed disks that are currently not attached to any virtual machine. These continue to bill for 100% of their provisioned GB size.',
    actionGuidance: 'Review disk creation date and tags. If no snapshot is needed, delete the disk using az disk delete. If needed for recovery, take an incremental snapshot and delete the managed disk.',
    kql: `Resources
| where type =~ 'microsoft.compute/disks'
| where properties.diskState =~ 'Unattached'
| project name, resourceGroup, subscriptionId, location, sku = tostring(sku.name), sizeGB = toint(properties.diskSizeGB), timeCreated = properties.timeCreated
| order by sizeGB desc`,
    cliCommand: `az graph query -q "Resources | where type =~ 'microsoft.compute/disks' | where properties.diskState =~ 'Unattached' | project name, resourceGroup, subscriptionId, location, sku = tostring(sku.name), sizeGB = toint(properties.diskSizeGB) | order by sizeGB desc" --first 1000`,
    wasteCategory: 'disks',
    estimatedWasteImpact: '$$$ – Can easily save thousands per month across multi-subscription environments.'
  },
  {
    id: 'unassociated-public-ips',
    title: 'Unassociated Public IP Addresses',
    description: 'Identifies Standard and Basic public IP addresses that are not assigned to any network interface, NAT gateway, or public IP prefix.',
    actionGuidance: 'Delete unassociated public IPs unless specifically reserved for an upcoming deployment. Consider using Azure Bastion Developer SKU or private endpoints instead of public IPs on VMs.',
    kql: `Resources
| where type =~ 'microsoft.network/publicipaddresses'
| where isnull(properties.ipConfiguration) and isnull(properties.natGateway) and isnull(properties.publicIPPrefix)
| project name, resourceGroup, subscriptionId, location, sku = tostring(sku.name)`,
    cliCommand: `az graph query -q "Resources | where type =~ 'microsoft.network/publicipaddresses' | where isnull(properties.ipConfiguration) and isnull(properties.natGateway) and isnull(properties.publicIPPrefix) | project name, resourceGroup, subscriptionId, location, sku = tostring(sku.name)" --first 1000`,
    wasteCategory: 'ip',
    estimatedWasteImpact: '$ – Public IPs bill hourly whether attached or not.'
  },
  {
    id: 'vms-stopped-not-deallocated',
    title: 'VMs Stopped but not Deallocated (Still Billing Compute)',
    description: 'Finds VMs that were stopped from within the guest operating system. These remain allocated on Azure physical hardware and bill full hourly compute rates.',
    actionGuidance: 'Deallocate these VMs immediately using az vm deallocate or the Azure Portal Stop button. Instruct developers never to use OS-level shutdown alone.',
    kql: `Resources
| where type =~ 'microsoft.compute/virtualmachines'
| extend powerState = tostring(properties.extended.instanceView.powerState.code)
| where powerState =~ 'PowerState/stopped'
| project name, resourceGroup, subscriptionId, location, size = tostring(properties.hardwareProfile.vmSize)`,
    cliCommand: `az graph query -q "Resources | where type =~ 'microsoft.compute/virtualmachines' | extend powerState = tostring(properties.extended.instanceView.powerState.code) | where powerState =~ 'PowerState/stopped' | project name, resourceGroup, subscriptionId, location, size = tostring(properties.hardwareProfile.vmSize)" --first 1000`,
    wasteCategory: 'compute',
    estimatedWasteImpact: '$$$ – Pure phantom compute charges with zero workload value.'
  },
  {
    id: 'empty-app-service-plans',
    title: 'Empty App Service Plans',
    description: 'Locates App Service hosting plans (server farms) that host zero web apps or function apps. The hosting tier continues to bill at 100% capacity.',
    actionGuidance: 'Delete the server farm if it is no longer required, or move standalone apps onto it to consolidate existing plans.',
    kql: `Resources
| where type =~ 'microsoft.web/serverfarms'
| where toint(properties.numberOfSites) == 0
| project name, resourceGroup, subscriptionId, location, sku = tostring(sku.name), tier = tostring(sku.tier)`,
    cliCommand: `az graph query -q "Resources | where type =~ 'microsoft.web/serverfarms' | where toint(properties.numberOfSites) == 0 | project name, resourceGroup, subscriptionId, location, sku = tostring(sku.name), tier = tostring(sku.tier)" --first 1000`,
    wasteCategory: 'appservice',
    estimatedWasteImpact: '$$ – Especially high if Premium or Isolated App Service plans were left behind.'
  },
  {
    id: 'orphaned-network-interfaces',
    title: 'Orphaned Network Interfaces (NICs)',
    description: 'Identifies network interfaces that are no longer bound to any virtual machine, private endpoint, or private link service.',
    actionGuidance: 'Confirm whether associated IP configurations or DNS registrations are needed. Delete unused NICs to clean up network topologies and avoid IP address sprawl.',
    kql: `Resources
| where type =~ 'microsoft.network/networkinterfaces'
| where isnull(properties.virtualMachine) and isnull(properties.privateEndpoint) and isnull(properties.privateLinkService)
| project name, resourceGroup, subscriptionId, location`,
    cliCommand: `az graph query -q "Resources | where type =~ 'microsoft.network/networkinterfaces' | where isnull(properties.virtualMachine) and isnull(properties.privateEndpoint) and isnull(properties.privateLinkService) | project name, resourceGroup, subscriptionId, location" --first 1000`,
    wasteCategory: 'networking',
    estimatedWasteImpact: '$ – Hygiene and IP management, prevents ghost NIC attachments.'
  },
  {
    id: 'idle-load-balancers',
    title: 'Load Balancers with No Backend Pool Members',
    description: 'Finds Standard Load Balancers whose backend pools have zero registered member IPs or network interfaces.',
    actionGuidance: 'Standard Load Balancers bill a baseline hourly fee for rule processing. Delete idle balancers left behind after service decommissions.',
    kql: `Resources
| where type =~ 'microsoft.network/loadbalancers'
| where array_length(properties.backendAddressPools) == 0
| project name, resourceGroup, subscriptionId, location, sku = tostring(sku.name)`,
    cliCommand: `az graph query -q "Resources | where type =~ 'microsoft.network/loadbalancers' | where array_length(properties.backendAddressPools) == 0 | project name, resourceGroup, subscriptionId, location, sku = tostring(sku.name)" --first 1000`,
    wasteCategory: 'networking',
    estimatedWasteImpact: '$$ – Eliminates hourly rule processing charges.'
  },
  {
    id: 'snapshots-older-than-90-days',
    title: 'Snapshots Older Than 90 Days',
    description: 'Lists all disk snapshots created more than 90 days ago. Many teams take manual backups before upgrades and forget to delete them.',
    actionGuidance: 'Audit snapshot retention policies. Snapshots past compliance or recovery windows should be pruned.',
    kql: `Resources
| where type =~ 'microsoft.compute/snapshots'
| extend ageDays = datetime_diff('day', now(), todatetime(properties.timeCreated))
| where ageDays > 90
| project name, resourceGroup, subscriptionId, ageDays, sizeGB = toint(properties.diskSizeGB)
| order by ageDays desc`,
    cliCommand: `az graph query -q "Resources | where type =~ 'microsoft.compute/snapshots' | extend ageDays = datetime_diff('day', now(), todatetime(properties.timeCreated)) | where ageDays > 90 | project name, resourceGroup, subscriptionId, ageDays, sizeGB = toint(properties.diskSizeGB) | order by ageDays desc" --first 1000`,
    wasteCategory: 'snapshots',
    estimatedWasteImpact: '$$ – Storage cost silently compounds over time as snapshots accumulate.'
  },
  {
    id: 'windows-vms-without-ahb',
    title: 'Windows VMs Without Azure Hybrid Benefit',
    description: 'Identifies Windows virtual machines that are currently being billed at full pay-as-you-go license rates instead of utilizing eligible Software Assurance rights.',
    actionGuidance: 'If your organization owns active Windows Server licenses with Software Assurance, apply AHB using az vm update --license-type Windows_Server to cut 40% off compute instantly.',
    kql: `Resources
| where type =~ 'microsoft.compute/virtualmachines'
| where tostring(properties.storageProfile.osDisk.osType) =~ 'Windows'
| extend licenseType = tostring(properties.licenseType)
| where licenseType !in~ ('Windows_Server', 'Windows_Client')
| project name, resourceGroup, subscriptionId, location, size = tostring(properties.hardwareProfile.vmSize)`,
    cliCommand: `az graph query -q "Resources | where type =~ 'microsoft.compute/virtualmachines' | where tostring(properties.storageProfile.osDisk.osType) =~ 'Windows' | extend licenseType = tostring(properties.licenseType) | where licenseType !in~ ('Windows_Server', 'Windows_Client') | project name, resourceGroup, subscriptionId, location, size = tostring(properties.hardwareProfile.vmSize)" --first 1000`,
    wasteCategory: 'licensing',
    estimatedWasteImpact: '$$$ – Eliminates Windows Server OS licensing surcharges.'
  },
  {
    id: 'premium-disks-in-non-prod',
    title: 'Premium Disks in Resources Tagged as Non-Production',
    description: 'Finds expensive Premium SSD disks attached to VMs in dev, test, and sandbox environments where Standard SSD is sufficient.',
    actionGuidance: 'Downgrade dev/test disks from Premium SSD to Standard SSD or Standard HDD during scheduled maintenance.',
    kql: `Resources
| where type =~ 'microsoft.compute/disks'
| where tostring(sku.name) startswith 'Premium'
| where tostring(tags['environment']) in~ ('dev', 'test', 'sandbox')
| project name, resourceGroup, subscriptionId, sku = tostring(sku.name), sizeGB = toint(properties.diskSizeGB)`,
    cliCommand: `az graph query -q "Resources | where type =~ 'microsoft.compute/disks' | where tostring(sku.name) startswith 'Premium' | where tostring(tags['environment']) in~ ('dev', 'test', 'sandbox') | project name, resourceGroup, subscriptionId, sku = tostring(sku.name), sizeGB = toint(properties.diskSizeGB)" --first 1000`,
    wasteCategory: 'disks',
    estimatedWasteImpact: '$$ – Standard SSD costs ~50% less than Premium SSD.'
  },
  {
    id: 'idle-nat-gateways',
    title: 'NAT Gateways with No Subnets Attached',
    description: 'Finds Azure NAT Gateways that have no subnets associated with them. NAT Gateways bill an hourly gateway fee regardless of traffic.',
    actionGuidance: 'Delete unattached NAT Gateways immediately or associate them with target subnets.',
    kql: `Resources
| where type =~ 'microsoft.network/natgateways'
| where isnull(properties.subnets) or array_length(properties.subnets) == 0
| project name, resourceGroup, subscriptionId, location`,
    cliCommand: `az graph query -q "Resources | where type =~ 'microsoft.network/natgateways' | where isnull(properties.subnets) or array_length(properties.subnets) == 0 | project name, resourceGroup, subscriptionId, location" --first 1000`,
    wasteCategory: 'networking',
    estimatedWasteImpact: '$ – Eliminates ~$32/month per idle gateway.'
  },
  {
    id: 'missing-required-team-tag',
    title: 'Resources Missing Required Team / Owner Tag',
    description: 'Summarizes unallocated resources by resource type and subscription where the required "team" or "owner" tag is missing.',
    actionGuidance: 'Leverage Azure Policy to enforce tag inheritance from resource groups or require tags on creation.',
    kql: `Resources
| where isempty(tostring(tags['team'])) and isempty(tostring(tags['owner']))
| summarize count() by type, subscriptionId
| order by count_ desc`,
    cliCommand: `az graph query -q "Resources | where isempty(tostring(tags['team'])) and isempty(tostring(tags['owner'])) | summarize count() by type, subscriptionId | order by count_ desc" --first 1000`,
    wasteCategory: 'governance',
    estimatedWasteImpact: '$$$ – Allocation visibility is the foundation for chargeback and accountability.'
  }
];
