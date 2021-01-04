const axios = require("axios");
const cheerio = require("cheerio");
const cp = require("child_process");
const {promisify} = require("util");

const sizeOf = require('image-size');

const spwan = promisify(cp.spawn);
const {
  createCanvas,
  loadImage
} = require('canvas');
const {
  pathToFileURL
} = require("url");
const path = require('path');
const fs = require("fs");
const argv = require("minimist")(process.argv.slice(2));

let ret = [];

const config = {
  headers: {
    'user-agent' : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36', 
    'Accept-Charset': 'utf-8'
  }
};


// 크롤러 시작
const getHtml = async () => {
  try {
    return await axios.get("https://www.sta1.com/sales/all?gndr=M&shopType=S", config);
  } catch (error) {
    console.error(error);
  }
}

// 분할 다운로드 시작
function startAria2c(data) {
  data.forEach(async config => {
      // const targetUrl = mainUrl + config.imgPath
      const targetUrl = config.src;

      try {
        await spwan("aria2c.exe", [targetUrl], {});
      } catch(e) {
        console.warn(e);
      }
      
  });
}

// 파워쉘 시작
function startPowershell(data) {
  data.forEach(async config => {
      // const targetUrl = mainUrl + config.imgPath;
      // const name = targetUrl.substring(targetUrl.lastIndexOf("/") + 1, targetUrl.length);
      const targetUrl = config.src;
      try {
        await spawn("powershell", ["wget", targetUrl, "-OutFile", name], {});
      } catch(e) {
        config.warn(e);
      }
      ``
  });
}

/**
 * 
 */
function load() {

  const list = require("./output.json");

  return new Promise((resolve, reject) => {
    list.forEach(async i => {

      const title = i.title;
      const price = i.price;
	  const shop = i.shop;

      try {
        const image = await loadImage(path.basename(i.src));
        const dimensions = sizeOf(path.basename(i.src))
        const canvas = createCanvas(dimensions.width, dimensions.height);
        const ctx = canvas.getContext('2d')        
        
        ctx.drawImage(image, 0, 0, image.width, image.height);
        const item = {
		  category: "item",
          url: canvas.toDataURL(),
          title,
          price,
		  shop
        };
        ret.push(item);

      } catch(e) {
        reject("image is not find");
      }
    });

    resolve(ret);
  })
}

if(argv.download) {
  getHtml().then(html => {

    const imgList = [{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/11/1605148975768_f.jpg","title":"앤커버 최대 68%할인!","term":"11.12 ~ 11.15","shop":"에이랜드"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/11/1604890469970_f.jpg","title":"핫핑 바로득템 ~80% SALE","term":"11.09 ~ 재고 소진시","shop":"핫핑"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/11/1604890415693_f.jpg","title":"스포츠 브랜드 SALE ~83%","term":"11.09 ~ 11.20","shop":"무신사"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/11/1604889729401_f.jpg","title":"아뜨랑스 데이트룩♡ 35%off","term":"오늘까지","shop":"아뜨랑스"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/11/1604888910500_f.jpg","title":"명품블랙위크 up to 87%off","term":"11.09 ~ 11.22","shop":"머스트잇"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/11/1604888203216_f.jpg","title":"브랜드 369day, 20%off","term":"11.09 ~ 재고 소진시","shop":"디콜렉트"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/11/1604551820110_f.jpg","title":"인기슈즈 59% SALE","term":"11.05 ~ 11.30","shop":"힙합퍼"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/11/1604551682004_f.jpg","title":"올세인츠 up to 50% off!","term":"11.05 ~ 11.16","shop":"SI빌리지"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/11/1604551154597_f.jpg","title":"스포츠브랜드 슈즈 세일 50%","term":"11.05 ~ 11.15","shop":"ABC마트"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/11/1604370283639_f.jpg","title":"에잇세컨즈 신상특가 ~50%","term":"11.03 ~ 재고 소진시","shop":"SSF샵"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/11/1604369757339_f.jpg","title":"어반에이지 20FW 빅세일 68%","term":"11.03 ~ 재고 소진시","shop":"어반에이지"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/11/1604369230698_f.jpg","title":"명품하이엔드 ~52%할인","term":"11.03 ~ 11.09","shop":"셀렉온"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/11/1604283143488_f.jpg","title":"브랜드 아우터 최대 ~60%off","term":"11.02 ~ 11.30","shop":"무신사"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/11/1604282629604_f.jpg","title":"스튜디오톰보이, 시즌오프65%","term":"11.02 ~ 재고 소진시","shop":"SI빌리지"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/11/1604282159536_f.jpg","title":"아뜨랑스 니트아이템전 ~32%","term":"오늘까지","shop":"아뜨랑스"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/11/1604281606146_f.jpg","title":"쵸퍼 전품목 10%할인~!","term":"11.02 ~ 11.03","shop":"쵸퍼"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/10/1604034563335_f.jpg","title":"탑텐 아우터페스티벌 50%off","term":"10.30 ~ 11.30","shop":"탑텐"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/10/1604034171336_f.jpg","title":"네스티킥x네스티팬시클럽 80%","term":"10.30 ~ 재고 소진시","shop":"크루비"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/10/1604033872536_f.jpg","title":"플루크 미드세일 50%!","term":"10.30 ~ 11.10","shop":"인플럭스"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/10/1604033519471_f.jpg","title":"챔피온 겨울상품 ~30%off","term":"10.30 ~ 11.11","shop":"29CM"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/10/1604033228728_f.jpg","title":"슈즈브랜드 세일 up to 70%","term":"10.30 ~ 11.01","shop":"ABC마트"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/10/1604030222231_f.jpg","title":"필루미네이트 빅세일 -70%","term":"10.30 ~ 재고 소진시","shop":"필루미네이트"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/10/1604027455564_f.jpg","title":"엽페 신상 ~20%할인!","term":"10.30 ~ 11.07","shop":"엽페"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/10/1603768239493_f.jpg","title":"도로시와 세일축제 ~66%","term":"10.27 ~ 10.31","shop":"도로시와"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/10/1603638653309_f.jpg","title":"메이비베이비 up to 60%off","term":"10.26 ~ 재고 소진시","shop":"메이비베이비"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/10/1603637206881_f.jpg","title":"베이직하우스 미드세일 40%off","term":"10.26 ~ 재고 소진시","shop":"베이직하우스"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/10/1603636719747_f.jpg","title":"브랜드 니트컬렉션 ~77%","term":"10.26 ~ 11.08","shop":"무신사"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/10/1603335324013_f.jpg","title":"컨버스 모음전 40% SALE","term":"10.22 ~ 10.26","shop":"힙합퍼"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/10/1603335258267_f.jpg","title":"갠소 아울렛 ~80% 세일!","term":"10.22 ~ 재고 소진시","shop":"갠소"},{"category":"sale","src":"https://img.sta1.com/_up/sales/2020/10/1603334107615_f.jpg","title":"러닝하이 최대 30%할인!","term":"10.22 ~ 10.26","shop":"에이랜드"}];
  
    fs.writeFileSync("output.json", JSON.stringify(imgList), {
      encoding: "utf-8"
    });  
  
    const aria2c = cp.exec("where aria2c.exe");
    aria2c.on("exit", (signal) => {
        if(signal != 0) {
            startPowershell(imgList);
        } else {
            startAria2c(imgList);
        }
    });      
  
    return imgList;
  });

}

if(argv.output) {
  load().then(ret => {
    fs.writeFileSync("output_blob.json", JSON.stringify(ret, null, "\t"), "utf-8");
  });  
}
