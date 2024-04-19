import assert from 'assert';
import anchor from '@project-serum/anchor';

describe('mycalculatordapp', () => {
  const programId = anchor.web3.SystemProgram.programId;

  const provider = anchor.AnchorProvider.local();

  anchor.setProvider(provider);
  
  const calculator = anchor.web3.Keypair.generate();

  const program = anchor.workspace.MyCalculatorDapp();

  it('Creates a calculator', async() => {
    await program.rpc.create("My Calculator", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        SystemProgram: programId,
      },
      signers: [calculator]
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    
    assert.ok(account.greeting === "My Calculator");
  });
});