import { ethers } from 'ethers';
import AccessControlArtifact from '../abis/AccessControl.json';
//deployed_address
const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
let contract;

export async function initContract() {
  if (!window.ethereum) {
    throw new Error('No Web3 wallet found');
  }
  // ethers v6: BrowserProvider wraps window.ethereum
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer   = await provider.getSigner();
  // ← use the .abi array from the artifact
  contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    AccessControlArtifact.abi,
    signer
  );
  return contract;
}
export async function grantAccess(cid, users) {
  if (!contract) throw new Error('Call initContract() first');
  const tx = await contract.grantAccess(cid, users[0]);
  return tx.wait();  // extend logic for multiple
}

export function hasAccess(cid, user) {
   if (!contract) throw new Error('Call initContract() first');
  return contract.hasAccess(cid, user);
}
export function getContractInstance() {
  if (!contract) throw new Error('Call initContract() first');
  return contract;
}
export async function getOwner() {
  return await contract.owner();
}
// Export the contract instance for advanced use
export default contract;