<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>쇼핑몰 클론 프로젝트</title>
    <link rel="stylesheet" href="<%=application.getContextPath()%>/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/a99df0f94f.js" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/underscore@1.11.0/underscore-min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <style>
    	.basket-tunnel {
	    	 overflow:hidden;
	    	 overflow-x:hidden;
	    	 overflow-y:hidden;
	    	 height:850px;
	    	 width:100%;
	    	 background: #F3F7FA;
	    	 margin-bottom: 1em;
    	}
    	
    	header {
    		height: calc(var(--header-box-height) / 2);
    	}
    	
    </style>
</head>
<body>
    <!-- 컨테이너의 시작 -->
    <div class="container">
        <jsp:include page="/header.jsp">
        	<jsp:param name="isHide" value="<%= true %>" /> 
        </jsp:include>
	 		
        <!-- 본문의 시작 -->
        <section>
            <!-- 본문이 들어가는 래퍼 -->
            <div class="contents-wrapper">
            	<iframe id="basket" name="basket" frameBorder="0" scrolling="no" class="basket-tunnel" height="850px" width="80%" src="/pages/basket.jsp"></iframe>      
            </div>
        </section>
    </div>
    <!-- 라이트 박스-->
    <div id="light-box-container">
    </div>
    <jsp:include page="/pages/login.jsp"></jsp:include>
    <!-- index.js는 메인 용이므로 알맞은 스크립트를 사용해야 합니다-->
    <script type="module" src="<%=application.getContextPath()%>/js/MorePage.js"></script>
    <script>
	    jQuery.fn.serializeObject = function() {
	        var obj = null;
	        try {
	            if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
	                var arr = this.serializeArray();
	                if (arr) {
	                    obj = {};
	                    jQuery.each(arr, function() {
	                        obj[this.name] = this.value;
	                    });
	                }//if ( arr ) {
	            }
	        } catch (e) {
	            alert(e.message);
	        } finally {
	        }
	     
	        return obj;
	    };
	    
	    document.querySelector("#basket").addEventListener("load", function() {
	        // 장바구니 삭제
	        $("#basket").contents().find("#delete-selection-cart").on("click", () => {
	        	basketSubmit();
	        });	    

	    	function basketSubmit() {
	    		
	            const form = document.createElement("form");
	            form.action = "/contents/deleteCart.do";
	            form.method = "POST";
	            form.name = "content_form";
	            form.id = "myform";
	            
	            $("#basket").contents().find(".item").each((index, elem) => {
	            	const input = $(elem).find("input[type=checkbox]");
	            	if(input.is(":checked")) {
	            		const id = document.createElement("input");
	            		id.type = "hidden";
	            		id.name = "idlist" + index;
	            		id.value = $(elem).data("id");
	            		form.appendChild(id);
	            	}
	            });
	            
          		const id = document.createElement("input");
        		id.type = "hidden";
        		id.name = "length";
        		id.value = $("#basket").contents().find(".item input[type=checkbox]:checked").length;
        		form.appendChild(id);
	            
	            document.body.appendChild(form);
	            
	            const formJson = $("#myform").serializeObject();
	            
	            console.log(formJson);
	            
	            $.ajax({
	            	url: "/contents/deleteCart.do",
	            	method: "GET",
	            	data: formJson,
	            	success: function(data) {
	            		console.log(status);
	            		if(data.status === "success") {
	            			alert("삭제 완료");
	            			window.location.href= "/pages/basket-tunnel.jsp";
	            		} else {
	            			alert("삭제 실패");
	            			window.location.href= "/pages/basket-tunnel.jsp";
	            		}
	            	}
	            });
			
	    	}	 	    
		       	
	    });
	    

    </script>
</body>
</html>
