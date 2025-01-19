const hre = require("hardhat");

async function main() {
    // Obter o Factory do contrato
    const LogisticaSaude = await hre.ethers.getContractFactory("LogisticaSaude");

    // Implante o contrato
    const contrato = await LogisticaSaude.deploy();

    // Aguarde a confirmação da implantação
    await contrato.waitForDeployment();

    // Exiba o endereço do contrato
    console.log(`Contrato implantado em: ${contrato.target}`);
}

// Tratamento de erros
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
