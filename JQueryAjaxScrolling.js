(function($) {

    var $pager = $('#blog-pager'),
        $posts = $('.blog-posts'),
        loading = false;

    // AJAX
    $pager.find('#blog-pager-newer-link').remove(); // Menyingkirkan navigasi posting lebih baru
    $pager.on("click", "#blog-pager-older-link a", function() {
        $.get(this.href, {}, function(data) {
            var source = $(data).find('.post').length ? $(data) : $('<div></div>');
            $posts.append(source.find('.blog-posts').html());
            $pager.html(source.find('#blog-pager-older-link').clone());
            loading = false;
        }, "html");
        $(this).replaceWith('<span>Memuat...</span>'); // Ubah navigasi posting menjadi indikator memuat saat sedang memuat
        return false;
    });

    // INFINITE SCROLL
    $(window).on("scroll resize", function() {
        // Jika AJAX sedang tidak memuat dan jika jarak gulungan layar + tinggi layar telah mencapai
        // tinggi yang sama dengan/lebih besar dari offset navigasi halaman terhadap bagian teratas dari layar...
        if (!loading && ($(this).scrollTop() + $(this).height()) >= $pager.offset().top) {
            $pager.find('#blog-pager-older-link a').trigger("click"); // Picu event `.click()` pada navigasi AJAX posting
            loading = true; // Mulai antre pemuatan
        }
    });

})(jQuery);
