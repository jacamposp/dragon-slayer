export async function swordAnimation() {
  return new Promise<void>((resolve) => {
    const swordLeft = '⚔️';
    const swordRight = '⚔️';
    const fightFrames: string[] = [
      `   ${swordLeft}     ${swordRight}`,
      `    ${swordLeft}   ${swordRight} `,
      `     ${swordLeft} ${swordRight}  `,
      `      ${swordLeft}${swordRight}   `,
      `     ${swordLeft} ${swordRight}  `,
      `    ${swordLeft}   ${swordRight} `,
      `   ${swordLeft}     ${swordRight}`,
    ];

    let i = 0;
    const frameTime = 100; // ms
    const duration = 2000; // ms
    const totalFrames = duration / frameTime;

    process.stdout.write('\n');

    const interval = setInterval(() => {
      process.stdout.write(`\r${fightFrames[i % fightFrames.length]}`);
      i++;

      if (i >= totalFrames) {
        clearInterval(interval);
        process.stdout.write(`\r`);
        resolve();
      }
    }, frameTime);
  });
}
