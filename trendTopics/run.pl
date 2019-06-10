#!/usr/bin/perl
use utf8;
use strict;
use warnings;
use Data::Dumper;
use JSON;

# Import script return via STDOUT
my $posts = `node main.js`;

my $perl_scalar = JSON->new->utf8->decode($posts);

my $name = _trimSpaces($perl_scalar->{name});
my $twet = _trimSpaces($perl_scalar->{text});

#$posts =~ s/^\'+/"/;
# print STDOUT Data::Dumper::Dumper($perl_scalar);
# print STDOUT Data::Dumper::Dumper(${$perl_scalar->{status}});

if($perl_scalar->{status} eq "1"){
	print "Nombre: ".$name."\n";
	print "Tweet: ".$twet."\n";
}else{
	print "Algo salió mal";
}

sub _trimSpaces {
	my $arg = shift;
	$arg =~ s/\s+/ /g;
	return $arg;
	#print STDOUT Data::Dumper::Dumper($string);
}

1;
