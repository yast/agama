# frozen_string_literal: true

# Copyright (c) [2022] SUSE LLC
#
# All Rights Reserved.
#
# This program is free software; you can redistribute it and/or modify it
# under the terms of version 2 of the GNU General Public License as published
# by the Free Software Foundation.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
# FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
# more details.
#
# You should have received a copy of the GNU General Public License along
# with this program; if not, contact SUSE LLC.
#
# To contact SUSE LLC about this file by physical or electronic mail, you may
# find current contact information at www.suse.com.

require_relative "../../test_helper"
require "dinstaller/network/connection_state"

describe DInstaller::Network::ConnectionState do
  subject { DInstaller::Network::ConnectionState::UNKNOWN }

  describe "#by_id" do
    it "returns the type with the given ID" do
      expect(described_class.by_id(0)).to eq(subject)
    end

    context "when the type does not exist" do
      it "returns nil" do
        expect(described_class.by_id(50)).to be_nil
      end
    end
  end

  describe "#==" do
    context "when the given type has the same id" do
      let(:other) { DInstaller::Network::ConnectionState::UNKNOWN }

      it "returns true" do
        expect(subject).to eq(other)
      end
    end

    context "when the given type has different ids" do
      let(:other) { DInstaller::Network::ConnectionState::ACTIVATED }

      it "returns false" do
        expect(subject).to_not eq(other)
      end
    end
  end
end
