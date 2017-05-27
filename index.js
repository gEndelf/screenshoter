const phantom = require('phantom');

const resolutions = [
  '1200x800',
  '1024x800',
  '500x800',
  '900x800',
];

const outputPath = process.env.npm_config_output || '.';
const url = process.env.npm_config_url;

(async function() {
  const instance = await phantom.create();
  const page = await instance.createPage();
  
  const status = await page.open(url);
  console.log(`Page opened with status [${status}].`);
  
  for (let i = 0; i < resolutions.length; i++) {
    const resolution = resolutions[i];
    
    const arr = resolution.split('x');
    const width = parseInt(arr[0]);
    const height = parseInt(arr[1]);
    
    await page.property('viewportSize', {width, height});
    const imgPath = `${outputPath}/screen_${resolution}.png`;
    
    await page.render(imgPath);
    console.log(`File created at [${imgPath}]`);
  }
  
  console.log('Done!');
  await instance.exit();
}());
