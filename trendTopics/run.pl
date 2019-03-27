#!/usr/bin/perl
use strict;
use warnings;
use Data::Dumper;
use JSON;


my $posts = `node main.js`;


$posts =~ s/^\'+/"/;

print $posts;
#my $perl_scalar = JSON->new->utf8->decode($posts);
#print Dumper($perl_scalar);

1;
