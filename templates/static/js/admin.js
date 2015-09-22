$(document).ready(function() {
    var db = null;

    // if (location.hostname == 'domain.com') {
    //     db = new Firebase('https://production.firebaseio.com/');

    // } else {
        db = new Firebase('https://academy-dev.firebaseio.com/');
    // }

    if ($('#admin').length) {
        var oid = getQuery('oid');

        if (!oid) {
            db.child('project').on('child_added', function(snapshot) {
                var obj = snapshot.val(),
                    $tr = $('<tr/>'),
                    $a = $('<a/>');

                  $a.attr('href', window.location.href + '?oid=' + snapshot.key());
                  $a.append($('<i/>').addClass('fa fa-pencil'));

                  $tr.append($('<td>').addClass('m-ellipsis title').text(obj.title));
                  $tr.append($('<td>').addClass('m-ellipsis tagline').text(obj.tagline));
                  $tr.append($('<td>').addClass('m-ellipsis status').text(obj.status));
                  $tr.append($('<td>').append($a));
                  $tr.children(':last-child').append($('<i/>').addClass('fa fa-times').data('oid', snapshot.key()));

                  $('#admin .b-list tbody').prepend($tr);
            });

            $('#admin .b-list').removeClass('m-display-none');

        } else {
            db.child('project').child(oid).once('value', function(snapshot) {
                var obj = snapshot.val();

                for (var x in obj) {
                    if ($('#admin :input[name=' + x + ']').length) {
                        $('#admin :input[name=' + x + ']').val(obj[x]);
                    }
                }

                obj.team.forEach(function(x) {
                    if (x != 0) {
                        var $div = $('<div/>'),
                            $img = $('<img/>'),
                            $span0 = $('<span/>'),
                            $span1 = $('<span/>'),
                            $span2 = $('<span/>');

                        if (x.image) {
                            $img.attr('src', x.image);
                            $img.addClass('image');

                            $span0.append($img);
                        }

                        $span1.addClass('name').text(x.name);
                        $span2.addClass('profile').text(x.profile);

                        $div.append($span0);
                        $div.append($span1);
                        $div.append($span2);
                        $div.append($('<i class="fa fa-times"/>'));

                        $('.team-wrapper').append($div);
                    }
                });

                obj.gallery.forEach(function(x) {
                    if (x != 0) {
                        var $img = $('<img/>'),
                            $span = $('<span/>');

                        $img.attr('src', x);
                        $img.addClass('image');

                        $span.append($img);
                        $span.append($('<i class="fa fa-times"/>'));

                        $('.gallery-wrapper').append($span);
                    }
                });

                obj.news.forEach(function(x) {
                    if (x != 0) {
                        var $div = $('<div/>'),
                            $span0 = $('<span/>'),
                            $span1 = $('<span/>');

                        $span0.addClass('publication').text(x.publication);
                        $span1.addClass('date').text(x.date);

                        $div.append($span0);
                        $div.append($span1);
                        $div.append($('<i class="fa fa-times"/>'));

                        $('.news-wrapper').append($div);
                    }
                });

                $('#admin .b-edit').removeClass('m-display-none');
            });
        }
    }

    $('#admin .add-button').click(function() {
        var doc = {};

        $('#admin .b-edit')[0].reset();

        $('#admin .b-edit').find(':input[name]').each(function() {
            doc[$(this).attr('name')] = $(this).val();
        });

        doc.team = [0];
        doc.news = [0];
        doc.gallery = [0];

        db.child('project').push(doc);

        return false;
    });

    $('#admin .b-list').on('click', '.fa.fa-times', function() {
        db.child('project').child($(this).data('oid')).set(null);

        $(this).parents('tr').remove();
    });

    $('#admin .b-edit :input[name]').change(function() {
        var oid = getQuery('oid'),
            key = $(this).attr('name'),
            val = $(this).val();

        db.child('project').child(oid).child(key).set(val);

        toastr.success('Saved', '', {'positionClass': 'toast-bottom-right'});

        return false;
    });

    $('.datepicker').each(function() {
        new Pikaday({ field: this, format: 'MM/DD/YYYY' });
    });

    $('.uploader').change(function() {
        var file = this.files[0],
            $input = $(this);

        if (file.size < 0.2 * 1024 * 1024) {
            if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                if (file.type.match('image')) {
                    var reader = new FileReader();

                    reader.onload = function(event) {
                        $input.data('image', event.target.result);
                    };

                    reader.readAsDataURL(file);

                    return true;
                }
            }

            $input.val('');

            alert('File must be an image format (jpg, png or gif');

        } else {
            $input.val('');

            alert('File size must no exceed 200KB');
        }

        return false;
    });

    $('.uploader-large').change(function() {
        var file = this.files[0],
            $input = $(this);

        if (file.size < 0.5 * 1024 * 1024) {
            if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                if (file.type.match('image')) {
                    var reader = new FileReader();

                    reader.onload = function(event) {
                        $input.data('image', event.target.result);
                    };

                    reader.readAsDataURL(file);

                    return true;
                }
            }

            $input.val('');

            alert('File must be an image format (jpg, png or gif');

        } else {
            $input.val('');

            alert('File size must no exceed 200KB');
        }

        return false;
    });

    $('.add-team').click(function() {
        var dic = {},
            $parent = $(this).parent();

        dic.image = $parent.find('.uploader').data('image') || '';
        dic.name = $parent.find('.name').val();
        dic.profile = $parent.find('.profile').val();

        if (dic.name.length) {
            var lst = [dic],
                $div = $('<div/>'),
                $img = $('<img/>'),
                $span0 = $('<span/>'),
                $span1 = $('<span/>'),
                $span2 = $('<span/>');

            $('.team-wrapper div').each(function() {
                var dic2 = {};

                dic2.image = $(this).find('.image').attr('src') || '';
                dic2.name = $(this).find('.name').text() || '';
                dic2.profile = $(this).find('.profile').text() || '';

                lst.push(dic2);
            });

            db.child('project').child(getQuery('oid')).child('team').set(lst);

            toastr.success('Saved', '', {'positionClass': 'toast-bottom-right'});

            if (dic.image) {
                $img.attr('src', dic.image);
                $img.addClass('image');

                $span0.append($img);
            }

            $span1.addClass('name').text(dic.name);
            $span2.addClass('profile').text(dic.profile);

            $div.append($span0);
            $div.append($span1);
            $div.append($span2);
            $div.append($('<i class="fa fa-times"/>'));

            $('.team-wrapper').prepend($div);

            $parent.find('.uploader').val('').data('image', '');
            $parent.find('.name').val('');
            $parent.find('.profile').val('');

            return false;
        }
    });

    $('.team-wrapper').on('click', '.fa-times', function() {
        var lst = [];

        $(this).parent().remove();

        $('.team-wrapper div').each(function() {
            var dic = {};

            dic.image = $(this).find('.image').attr('src') || '';
            dic.name = $(this).find('.name').text() || '';
            dic.profile = $(this).find('.profile').text() || '';

            lst.push(dic);
        });

        if (lst.length == 0) {
          lst.push(0);
        }

        db.child('project').child(getQuery('oid')).child('team').set(lst);

        toastr.success('Saved', '', {'positionClass': 'toast-bottom-right'});

        return false;
    });

    $('.add-gallery').click(function() {
        var $inp = $(this).siblings().eq(0),
            b64 = $inp.data('image') || '';

        if (b64.length) {
            var lst = [b64],
                $img = $('<img/>'),
                $span = $('<span/>');

            $('.gallery-wrapper span').each(function() {
                lst.push($(this).find('img').attr('src'));
            });

            db.child('project').child(getQuery('oid')).child('gallery').set(lst);

            toastr.success('Saved', '', {'positionClass': 'toast-bottom-right'});

            $img.attr('src', lst[0]);
            $img.addClass('image');

            $span.append($img);
            $span.append($('<i class="fa fa-times"/>'));

            $('.gallery-wrapper').prepend($span);

            $inp.val('');
            $inp.data('image', '');

            return false;
        }
    });

    $('.gallery-wrapper').on('click', '.fa-times', function() {
        var lst = [];

        $(this).parent().remove();

        $('.gallery-wrapper span').each(function() {
          lst.push($(this).find('img').attr('src'));
        });

        if (lst.length == 0) {
          lst.push(0);
        }

        db.child('project').child(getQuery('oid')).child('gallery').set(lst);

        toastr.success('Saved', '', {'positionClass': 'toast-bottom-right'});

        return false;
    });

    $('.add-news').click(function() {
        var dic = {},
            $parent = $(this).parent();

        dic.publication = $parent.find('.publication').val();
        dic.date = $parent.find('.datepicker').val();

        if (dic.publication.length) {
            var lst = [dic],
                $div = $('<div/>'),
                $span0 = $('<span/>'),
                $span1 = $('<span/>');

            $('.news-wrapper div').each(function() {
                var dic2 = {};

                dic2.publication = $(this).find('.publication').text() || '';
                dic2.date = $(this).find('.date').text() || '';

                lst.push(dic2);
            });

            db.child('project').child(getQuery('oid')).child('news').set(lst);

            toastr.success('Saved', '', {'positionClass': 'toast-bottom-right'});

            $span0.addClass('publication').text(dic.publication);
            $span1.addClass('date').text(dic.date);

            $div.append($span0);
            $div.append($span1);
            $div.append($('<i class="fa fa-times"/>'));

            $('.news-wrapper').prepend($div);

            $parent.find('.publication').val('');
            $parent.find('.datepicker').val('');

            return false;
        }
    });

    $('.news-wrapper').on('click', '.fa-times', function() {
        var lst = [];

        $(this).parent().remove();

        $('.news-wrapper div').each(function() {
            var dic = {};

            dic.publication = $(this).find('.publication').text() || '';
            dic.date = $(this).find('.date').text() || '';

            lst.push(dic);
        });

        if (lst.length == 0) {
          lst.push(0);
        }

        db.child('project').child(getQuery('oid')).child('news').set(lst);

        toastr.success('Saved', '', {'positionClass': 'toast-bottom-right'});

        return false;
    });
 });

function getQuery(param) {
    var query = location.search.substr(1),
        result = false;

    query.split('&').forEach(function(part) {
        var item = part.split('=');

        if (item[0] == param) {
            result = decodeURIComponent(item[1]);

            if (result.slice(-1) == '/') {
                result = result.slice(0, -1);
            }
        }
    });

    return result;
}
