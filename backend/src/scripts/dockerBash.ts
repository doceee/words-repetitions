import { execFileSync } from 'child_process';

if (!process.argv[2]) {
    console.error('Missing docker service name');
    process.exit(1);
}

execFileSync('docker', ['exec', '-it', `${process.argv[2]}`, 'bash'], {
    stdio: 'inherit'
});
