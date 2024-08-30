const { SignProtocolClient, SpMode, EvmChains } = require("@ethsign/sp-sdk");
const { privateKeyToAccount } =  require("viem/accounts");

const contractDetails = "Details of the contract";
//The signer’s address must be entered
const signer = "";

//The private key must be entered
const privateKey = "";

const client = new SignProtocolClient(SpMode.OnChain, {
  chain: EvmChains.baseSepolia,
  account: privateKeyToAccount(privateKey),
});

async function main(){
  const result = await createNotaryAttestation(contractDetails, signer);
  console.log(result);
}

async function createNotaryAttestation(contractDetails, signer) {
  const res = await client.createAttestation({
    schemaId: "0x34", //https://testnet-scan.sign.global/schema/onchain_evm_84532_0x34
    data: {
      contractDetails,
      signer
    },
    indexingValue: signer.toLowerCase()
  });

  return res;

}

main();