import { Component } from "./Component.js";
import { itemData, imgSrc, itemImg } from "../services/itemData.js";
import { Request } from "../Request.js";
import { ImagePath } from "./ImagePath.js";
import { DataLoader } from "./DataLoader.js";

/**
 * 주소에 있는 dataId 값을 인자를 파싱하여 id 값에 맞는 데이터를 동적으로 가져옵니다.
 * 
 * @author 어진석
 */
export class ItemDetailLoader extends Component {

    

    async run() {

        this._dataLoader = DataLoader.builder(this);

        // F 또는 M 값을 매개변수로부터 파싱합니다.
        $(".header-left a").eq(1).on("click", (ev) => {
            this._dataLoader.setParameter("gndr", "F");
        })
        $(".header-left a").eq(2).on("click", (ev) => {
            this._dataLoader.setParameter("gndr", "M");
        });

        const request = new Request();

        // 매개변수에서 데이터 ID 값을 파싱합니다.
        // 이 값은 없을 수도 있습니다.
        // 없을 경우에는 뒤로 가게 됩니다.
        const paramData = request.getParameter("data");
        let raw = "";
        let data = null;

        try {
            raw = decodeURIComponent(escape(atob(paramData)));
            data = JSON.parse(raw);;
        } catch(e) {
            data = await this.loadJsonAsync("/contents/findShop.do?id=" + request.getParameter("id"));
            const filename = data.contentData[0];
            let imgUrl = ImagePath.getItemPath(data.genderType, data.shopType, filename.url);
            data.thumbnail = imgUrl;
        }
    
        if(!data) {
            console.warn("데이터가 undefined이거나 null입니다.");
            return;
        }

        if(!data) {
            alert("정상적인 접근이 아닙니다.");
            history.go(-1);
            return;
        }

        const {contentData} = data;
        const myItem = contentData[0];
        
        // 구글 드라이브 메인 링크
        let imgSrc = data.thumbnail;

        // 상품명
        $("#detail-item-title, #title").text(myItem.title);

        // 상품 가격
        $("#detail-item-price, #price").text(myItem.price);
        
        $(".allPrice").text(0);
        
        // 이미지 주소
        $(".imgArea > img").attr("src", imgSrc);

    }

    static id() {
        return ItemDetailLoader;
    }
}