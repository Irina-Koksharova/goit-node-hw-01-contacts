import commander from 'commander'
const { Command } = commander
const program = new Command()

export default program
  .version('0.0.1')
  .requiredOption('-a, --action <type>', 'Action type')
  .option('-i, --id [type]', 'Contact id')
  .option('-n, --name [type]', 'Contact name')
  .option('-e, --email [type]', 'Contact email')
  .option('-p, --phone [type]', 'Contact phone')
      
        


