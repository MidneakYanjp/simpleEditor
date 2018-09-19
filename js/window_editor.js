$(document).ready(function () {
    //常用Jquery||dom元素
    let element={
        $phone_view:$(".phone-view"),
        $view:$(".view"),
        $img_upload:$(".image-upload"),
        $img_upload_ul:$(".image-upload .carouselbox"),
        $bg:$(".bg_black"),
        $Mobile:$(".Mobile"),
        $Mobile_content:$(".phone-view"),
        $textArea:$("#textarea"),
        $input:$(".title input,.author input"),
        textarea:document.getElementById('textarea')
    }
    //编辑器功能初始化
    let editor={
        init:function () {
            this.addEvent()
        },
        addEvent:function () {
            //select  change事件
            $(".font-size").on("change",function () {
                var val=$(this).find(":selected").text()
                document.execCommand("fontSize",false,val)
            })
            $(".font-name").on("change",function () {
                var val=$(this).find(":selected").text()
                document.execCommand('insertunorderedlist');
            })
            //文本裕聚焦失焦事件
            element.$textArea.on("focus",function () {
                $(".editor-tool").slideDown(300);
                $("#textarea .note").remove();
            })
            $(".view .title input,.view .author input").on("focus",function () {
                $(".editor-tool").slideUp(300);
            })
          //插入图片按钮点击事件
          $("input[data-function=insertImage]").click(function () {
              insertOpen(true);
          })
           //字体颜色
           $("input[data-function=fontColor]").on("change",function () {
               document.execCommand("ForeColor",false,$(this).val())
           })
            $("input[data-function=bgColor]").on("change",function () {
                document.execCommand("backColor",false,$(this).val())
            })
            //预览按钮
            $(".preview-btn").on("click",function () {
                if ($(".view .title input").val()==""){
                    layer.msg("您还未填写标题");
                    return false;
                } else {
                    var top=$(".view").scrollTop();
                    $(".phone-view .phoneTitle span").text($(".view .title input").val());
                    $(".phone-view .main-content").html(element.$textArea.html())
                    layer.msg("保存成功");
                    element.$Mobile.show();
                    element.$bg.css("top",top).show();
                    $(".view").css("overflow","hidden")
                }
            })
            //超链接
            $("input[data-function=link]").on("click",function () {
                var link=window.prompt("请输入要跳转到的链接");
                link&&document.execCommand('CreateLink',false,link)
            })
            $("input[data-function=link-video]").on("click",function () {
                element.textarea.focus()
            })
            $("input[data-function=link-video]").on("change",function () {
                srcs = getObjectURL(this.files[0])
                insertHtmlAtCaret(`</br><video controls src=${srcs}></video></br>`)
            })
            $("input[data-function=link-image]").on("click",function () {
                element.textarea.focus()
            })
            $("input[data-function=link-image]").on("change",function () {
                srcs = getObjectURL(this.files[0])
                insertHtmlAtCaret(`</br><img src=${srcs}></br>`)
            })
        }
    }
    //黑色背景
    $(".bg_black").on("click",function () {
        element.$Mobile.hide();
        element.$bg.hide();
        $(".view").css("overflow","scroll")
    });
    //公用方法
    //获取上传图片的URL
    function getObjectURL(file) {  //获取上传的URL
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file)
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file)
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file)
        }
        return url;
    };
    //原生方法获取焦点
    function insertHtmlAtCaret(html) {
            var sel, range;
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                // Range.createContextualFragment() would be useful here but is
                // non-standard and not supported in all browsers (IE9, for one)
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);
                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
    }
    //插入图片弹窗样式切换
    function insertOpen(isOpen){
        isOpen?element.$img_upload.show():element.$img_upload.hide()
    }
    editor.init()
})