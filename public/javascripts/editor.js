let codeMirror = CodeMirror(document.getElementsByClassName('editor')[0], {
  value: $('input[name="predefined"]').val(),
  mode: 'gfm',
  theme: 'neo',
  lineNumbers: true,
  lineWrapping: true,
  fencedCodeBlockHighlighting: true,
  autofocus: true,
  viewportMargin: Infinity, // set to 10 on large document to prevent effects on performance
  autoCloseBrackets: true,
  styleActiveLine: true
})

marked.setOptions({
  headerIds: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
})


$('.editor .CodeMirror').on('keyup', function () {
  $('.preview .content').html(marked(codeMirror.getValue()))
  $('.preview .content li').has('input').addClass('task-list-item')
})

$('.dropdown').on('click', function () {
  $(this).attr('tabindex', 1).focus();
  $(this).find('.dropdown-menu').slideToggle(300);
})

$('.dropdown').on('focusout', function () {
  $(this).find('.dropdown-menu').slideUp(300);
})

$('.dropdown-item').on('click', function () {
  let value = $(this).text()
  $(this).parents('.dropdown').find('.placeholder').text(value);
  $(this).parents('.dropdown').find('input').val(value);
  $('.preview .category a').text(value)
})

$('input[name="is-custom-time"]').on('click', function () {
  if ($(this).prop("checked")) {
    $('.auto-time').hide()
    $('input[name="time"]')
      .val($('.auto-time').text())
      .show()
  } else {
    $('.auto-time').show();
    $('input[name="time"]')
      .val($('.auto-time').text())
      .hide()
  }
})

$('input[name="is-new-category"]').on('click', function () {
  if ($(this).prop("checked")) {
    $('.category .dropdown').hide();
    $('.category input[name="newCategory"]').show();
    $('.preview .category a').text($('input[name="newCategory"]').val() || '未分类')
  } else {
    $('.category .dropdown').show();
    $('.category input[name="newCategory"]').hide().val('')
    $('.preview .category a').text($('input[name="category"]').val() || '未分类')
  }
})

$('input[name="public"]').on('click', function () {
  if ($(this).prop("checked")) {
    $('.public').text('公开')
  } else {
    $('.public').text('隐藏')
  }
})

$('input[name="title"]').on('input', function () {
  $('.preview .title').text($(this).val() || "未命名")
})

$('input[name="time"]').on('input', function () {
  $('.preview .time').text($(this).val() || "未知时间")
})

$('input[name="newCategory"]').on('input', function () {
  $('.preview .category a').text($(this).val() || '未分类')
})

function getTime() {
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  let now = new Date()
  let day = days[now.getDay()]
  let date = String(now.getDate()).padStart(2, '0')
  let month = months[now.getMonth()]
  let year = now.getFullYear()
  let time = day + ', ' + month + ' ' + date + ', ' + year
  return time
}

$(function () {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault()
      return false
    }
  })

  const time = getTime()
  if (!$('.auto-time').text()) {
    $('.auto-time').text(time)
    $('input[name="time"]').val(time)
  }

  $('.preview .time').text($('.auto-time').text())
  $('.preview .title').text($('input[name="title"]').val() || "未命名")
  $('.preview .category a').text($('input[name="category"]').val() || "未分类")
  $('.preview .content').html(marked(codeMirror.getValue()))
})

$('.config-icon').on('click', function () {
  toggleDisplay($('.config'))
})

$('.preview-icon').on('click', function () {
  toggleDisplay($('.preview'))
})

$('.editor-icon').on('click', function () {
  toggleDisplay($('.editor'))
})

function toggleDisplay(element) {
  if (element.css('display') == 'none') {
    element.show()
  } else {
    element.hide()
  }
}

// TODO valid form before submission
// TODO 移动端按钮更加人性化，以及移动端border
$('form.config').submit(function () {
  let error
  let title = $('input[name="title"]').val().trim()
  let time = $('input[name="time"]').val().trim()
  let category = $('input[name="newCategory"]').val().trim() || $('input[name="category"]').val().trim()
  let id = $('input[name="id"]').val().trim()
  let author = $('input[name="author"]').val().trim()
  let source = codeMirror.getValue()
  let content = $('.preview .content').html()
  if (!title) {
    error = '请输入名称'
  } else if (!time) {
    error = '请输入时间或开启自动选择'
  } else if (!category) {
    error = '请选择分类'
  }
  if (error) {
    $('.error').show().text(error)
    return false
  }
  if (!id) {
    console.log("Post")
    $.ajax({
      method: 'POST',
      url: '/posts',
      data: {
        author,
        time,
        category,
        title,
        source,
        content
      },
      success: function (res) {
        if (res.result === 'success') {
          window.location.href = '/posts/' + res.id
        }
      }
    })
  } else {
    console.log("Put")
    $.ajax({
      method: 'PUT',
      url: '/posts/' + id,
      data: {
        id,
        author,
        time,
        category,
        title,
        source,
        content
      },
      success: function (res) {
        if (res.result === 'success') {
          window.location.href = '/posts/' + res.id
        }
      }
    })
  }
  return false
})
