export const PAGE_NAME_ENUM = {
  HOME: 'HOME',
  GALLERY: 'Gallery',
  AWARDS: 'Awards',
  ABOUT: 'About',
  DETAIL: 'Detail',
}

export const MEDIA_TYPE = {
  photo: 'url',
  video: 'url',
  animated_gif: 'preview_image_url',
}

export const becomeSponsorUrl = 'https://twitter.com/creatordaocc/status/1558283972551258112?s=20&t=BtyqMKjE6oOuyk-n1U6tCw'
export const joinTwitterText = 'I support the eco-friendly Ethereum Merge by becoming part of #ETHMergeArt. (🐻‍❄️x🕶️=🐼) \nCheck out the #ETHMergeArt contest and visit ETHMerge.art to join a better future with a better @Ethereum'
export const joinTwitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(joinTwitterText)}`
export const FAQ_CONTENT = {
  'What is "The Merge"?': '"The Merge" is an upgrade to Ethereum that swaps out the current proof-of-work (PoW) consensus mechanism with a more eco-friendly, efficient, and secure proof-of-stake (PoS) consensus mechanism. When the merge occurs the current PoW consensus mechanism will be fully deprecated and all blocks on Ethereum will be produced via PoS.',
  'When is "The Merge" happening?': 'At the time of writing there is no definitive date for "The Merge".\n' +
    '\n' +
    'The Ethereum community is pushing for all effort to be focused on the switch to proof-of-stake (PoS).\n' +
    '\n' +
    'The Ethereum PoS chain is currently running and underwent its first hard fork (Codenamed Altair) in October 2021.\n' +
    '\n' +
    'For more info about development progress go here https://github.com/ethereum/pm/blob/master/Merge/mainnet-readiness.md',
  'If I own any Ether (ETH) do I need to do anything?': 'No! All ETH on the Ethereum network under the current proof-of-work (PoW) consensus engine will be unaffected by the switch to the proof-of-stake (PoS) consensus engine once "The Merge" occurs. Users will experience no change in their day-to-day experience using Ethereum — all changes related to "The Merge" are "under the hood" and related to the consensus mechanism that secures the network.',
  'Can I stay on the proof-of-work (PoW) version of Ethereum after "The Merge"?': 'No — there is only one Ethereum and the entire network will switch to the new proof-of-stake (PoS) consensus engine. When "The Merge" occurs the entire Ethereum proof-of-work (PoW) chain becomes the Ethereum PoS chain.\n' +
    '\n' +
    'If any nodes were to continue mining a PoW version of Ethereum the would be on their own minority fork and the economic value of their block rewards would be far below their cost of operation. Because miners are incentivized to operate at a profit, it is expected that all PoW participants will immediately begin to mine with their hardware on other non-Ethereum PoW blockchains.',
  'Why is Ethereum switching to Proof of Stake (PoS)?': 'Ethereum in its current state is using proof-of-work (PoW) to ensure consensus amongst the thousands of nodes in the network. While PoW is reliable and secure, it is also extremely energy intensive. To produce each block on the network participants are required to use powerful and energy-hungry GPUs to solve a complex mathematical problem.\n' +
    '\n' +
    'Alternatively, proof-of-stake (PoS) guarantees the security of the network in a different way. In PoS, anyone with 32 ETH can deposit that ETH to become a validator, a node that participates in the network\'s consensus algorithm. Finalizing a block requires 2/3 of all active validators to sign off on it. Should a malicious actor try to tamper with the underlying protocol by using a large number of validators to revert a finalized block (the equivalent of a "51% attack" in PoW) their funds are slashed — meaning they lose a portion of their staked ETH. This makes attacks extremely expensive; it would be like a PoW system where if you use your mining hardware to attack the network then your hardware catches fire and is destroyed.\n' +
    '\n' +
    'PoS does not require the same energy-intensive hardware as PoW. Any relatively recent consumer hardware should be capable of running the software required to operate a 32 ETH staking node. If you deposit more than 32 ETH, you will be assigned multiple "validator slots" by the protocol, but you will still be able to run them from a single computer, though hardware requirements go up the more you stake. Most estimates put the expected energy savings from the switch to PoS to be around 99%. [source1] [source2]\n' +
    '\n' +
    'See also:\n' +
    '\n' +
    'A Proof of Stake Design Philosophy\n' +
    'Why Proof of Stake (Nov 2020)',
  'How does the decentralization of proof-of-stake (PoS) compare to proof-of-work (PoW)?': 'In addition to improved efficiency, one of the other major motivations for the switch to proof-of-stake (PoS) is the increase in decentralization and censorship resistance that PoS offers.\n' +
    '\n' +
    'PoW and PoS do have many similarities. They are both fully permissionless systems where anyone can participate. They both rely on economic sybil resistance: the impact you have on the network, and therefore the rewards that you can earn, are proportional to the quantity of economic resources that you put in (computer hardware and electricity in PoW, and coins in PoS). However, there are important differences between the two.\n' +
    '\n' +
    'To join as a miner in a PoW network, you need to purchase mining hardware (often specialized hardware called "application-specific integrated circuits" or "ASICs"), have access to a cheap and reliable source of energy, and have a substantial level of technical skill to run and maintain your "mining farm". Small-scale mining is possible, but economies of scale make it difficult to compete with larger and wealthier mining farms. Furthermore, because of their large electricity consumption, centralized authorities can easily detect mining farms and shut them down or coerce them into participating in attacks.\n' +
    '\n' +
    'PoS, especially the form of proof of stake used in Ethereum, is much friendlier to smaller participants. To join as a validator and start staking, you need to provide 32 ETH (and if you have less than that, decentralized staking pool tech based on multi-party computation is under development). The only hardware that you need to participate in PoS consensus is any reasonably modern consumer hardware (eg. a laptop) in order to run a node. Staking larger amounts of ETH requires more hardware to process more shards, but this is only expected to be a serious issue if you are staking millions of dollars. You can stake from anywhere, and you do not lose a significant amount of revenue from having an extra few hundred milliseconds of latency.',
  'How does proof-of-stake (PoS) differ from delegated-proof-of-stake (DPoS) used in other blockchain projects?': 'Delegated-proof-of-stake (DPoS) is a consensus mechanism, and often also a governance mechanism, that was originally pioneered by Bitshares and has since been adopted in many blockchains. A DPoS chain\'s consensus is run by a small number of nodes, called block producers (eg. EOS has 21 block producers). To become a block producer, one must first sign up as a delegate, and invite coin holders to vote for you. The delegates with the most coins voting for them become the block producers.\n' +
    '\n' +
    'The main challenges with DPoS are twofold:\n' +
    '\n' +
    'The concentration of block producing rights into 21 delegates is a large centralization risk; even after being elected, the delegates could seize power, start censoring transactions that they dislike including those that vote against them, etc.\n' +
    'Coin voting is vulnerable to collusion and bribe attacks\n' +
    'These issues are discussed in greater length in these posts:\n' +
    '\n' +
    'Notes on Blockchain Governance\n' +
    'Governance Part 2: Plutocracy Is Still Bad\n' +
    'On Collusion\n' +
    'These concerns are not mere theory; wealthy EOS ecosystem participants have been caught making agreements to vote for each other or in exchange for compensation.\n' +
    '\n' +
    'Proof-of-stake (PoS) as implemented in Ethereum does not have this notion of coin voting; instead, users run their own nodes and stake their coins directly. Of course, users are free to "vote for" other participants by joining their staking pools instead of staking by themselves. However, the key difference is that this is not vulnerable to bribes and collusion in the same way because the incentives pass through: if you join a staking pool that performs well, you get a higher reward, and if you join a staking pool that attacks the network and gets slashed, you will not be able to get all of your money back. This is different from coin voting, where someone who votes for a bad delegate does not suffer any personal penalties that someone who did not vote for that delegate does not suffer as well. This creates a very different and much safer set of incentives, and decentralization is boosted further by the very large number of stakers who avoid staking pools and instead stake by themselves.',
  'How do I participate in proof-of-stake (PoS) on Ethereum?': 'There are many ways to participate in proof-of-stake (PoS) on Ethereum. A great resource newcomers is the getting started post on /r/ethstaker. If you prefer video-based content, Superphiz\'s Intro to Eth2 & Staking ETHGlobal presentation is an excellent starting point.',
  'Do I really need 32 ETH in order to run a validator on the Ethereum network? That seems like a lot of money.': 'In short, no.\n' +
    '\n' +
    '32 ETH is a lot of money, but it was an amount chosen with good reason. It is high enough to keep network participants honest due to the risk of lost ETH if they behave dishonestly, but it is also low enough so that a sufficient number of validators can exist on the network - allowing it to maintain a high level of security. Although technically you do need 32 ETH to activate and run a validator, a service such as RocketPool allows someone with 17.6 or more ETH (16 ETH + 10% collateral) to be matched with 16 ETH deposited to the RocketPool smart contract by other stakers (who typically also have less than 32 ETH or don\'t want to run a validator themselves) so that you may run a validator without owning 32 ETH yourself.\n' +
    '\n' +
    'Their guides for setting up your own node are very easy to follow, you can either run on your own hardware or on a service like AWS. If you\'d prefer to have another service manage your node (handling updates, monitoring, etc.), allnodes allows for this.',
  'How does proof-of-stake (PoS) reduce the energy consumption of the Ethereum blockchain?': 'In proof-of-work (PoW) whoever solves the block first gets the reward. Simply put, PoW is a race. If you have more hash rate than your competitors you are more likely to win. The end result of this arms race is that PoW miners run as many GPUs as they can at 100% load, 24-hours-a-day. This extreme power demand continues to grow with the price of the block rewards they are attempting to earn.\n' +
    '\n' +
    'Alternatively, in proof-of-stake (PoS) block proposers are randomly selected — completely removing the requirement for an arms race. There is no way to increase the likelihood that any specific node is chosen to propose a block — so there is no need to consume more and more energy to improve your competitive chances.\n' +
    '\n' +
    'Because PoS nodes are estimated to be 99% (or more) more efficient their PoW counterparts, PoS represents a massive leap forward for the energy efficiency of blockchain technology.',
  'Does "The Merge" solve high gas prices (network fees)?': 'No. "The Merge" is limited in scope to upgrading Ethereum\'s consensus mechanism. In practice it will not have any effect on the current user experience of Ethereum today. Future updates on the Ethereum roadmap such as sharding, will directly help to improve gas prices. At this time sharding is considered to be a lower priority than "The Merge" — which eliminates wasteful proof-of-work (PoW) energy inefficiency — by a majority of the Ethereum community.',
  'What happens to the fees paid to Ethereum miners after the merge?': 'EIP 1559 will have been activated on Ethereum before the merge, and so by the time the merge happens the bulk of Ethereum transaction fees will already have been burned for months. The remaining fees that are not burned post-EIP-1559 (called "tips" or "priority fees") will simply be paid to the block proposer of the proof-of-stake block instead of a proof-of-work miner.',
  'What is "The Triple Halvening"?': '"The Triple Halvening" is the community name given to the large drop in ETH issuance that will occur once "The Merge" occurs and Ethereum is fully upgraded to the proof-of-stake (PoS) consensus algorithm. “The Triple Halvening” is a play on Bitcoin\'s “Halvening”. While Bitcoin halves its issuance rate every 4 years, Ethereum will see its issuance rate reduced by roughly 90% at the time of "The Merge". That\'s equivalent to *3 Bitcoin "Halvenings" happening at once! Ethereum will experience an issuance reduction in an instant what will take an additional 12 years to be matched on Bitcoin\'s network.\n' +
    '\n' +
    'Under the current proof-of-work (PoW) model Ethereum issues roughly 13,500 ETH per day — an annual issuance of about 4.3% of the total ETH supply. However, the PoS issuance model is determined based on how much ETH is actively being staked on the network. Current projections predict a drop to between a 0.3% to 0.4% issuance rate when "The Merge" occurs.\n' +
    '\n' +
    'For comparison, Bitcoin currently issues 900 BTC per day — an annual issuance of about 1.7% of the total BTC supply. The next two "Halvenings" will reduce Bitcoin\'s issuance to approximately 0.8% in 2024 and 0.4% in 2028. With Ethereum’s expected drop in issuance after "The Merge" to between 0.3% - 0.4% it will not be until 2028 that Bitcoin\'s issuance is again within range of Ethereum\'s.\n' +
    '\n' +
    'When "The Triple Halvening" is combined with the BASEFEE burn mechanism of EIP-1559 (live as of August 2021) it is projected that Ethereum\'s issuance will actually become deflationary during periods of high user activity.',
  'Are there any risks currently associated with "The Merge"?': 'There are always risks when making a large change to a protocol that is securing hundreds of billions of dollars of assets. "The Merge" can be thought of as replacing the engine of an airplane while it is still flying. Thankfully, the beacon chain — the current proof-of-stake (PoS) Ethereum chain - has been running since December 2020 without issues.\n' +
    '\n' +
    'There are currently 4 unique client implementations PoS Ethereum nodes. This means that if a PoS node operator experiences issues with a given implementation they will have the ability to switch to different client. The currently PoS network is the result of years of research and hard work. Participants can rest assured that before "The Merge" occurs the code in use will have been exhaustively checked, battle tested, and checked again.',
  'How can I test proof-of-stake (PoS) Ethereum?': 'If you are interested in helping with "The Merge": See Rayonism for in depth details on how to help contribute.\n' +
    '\n' +
    'If you are a dapp developer: Consider deploying your dapp on the testnet during the ETHGlobal Scaling Ethereum hackathon (April 16 - May 14). The more the merrier!\n' +
    '\n' +
    'If you are a L2 developer or a protocol developer who would like to help with the merge process: introduce yourself in the Eth R&D discord.\n' +
    '\n' +
    'If you are an Ethereum user: Be on the lookout for announcements from your favorite dapps that will be deploying on the upcoming testnet. Help your favorite developers kick the tires and shake out the bugs by using their dapps within the safety of a test environment.',
}
